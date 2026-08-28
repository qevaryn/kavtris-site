import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const executableExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts']);
const mutatingMethods = new Set(['post', 'put', 'patch', 'delete']);
const smokeRelativePath = path.join('tests', 'published-smoke');
const primarySmokeRelativePath = path.join(smokeRelativePath, 'production-read-only.spec.ts');

const requiredSnippets = [
  "test.describe('published production smoke is read-only'",
  "['POST', 'PUT', 'PATCH', 'DELETE']",
  'url.startsWith(origin)',
  'published smoke must not send first-party mutating requests',
  'API contact POSTs must stay at zero'
];

function discoverExecutableFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...discoverExecutableFiles(entryPath));
    } else if (entry.isFile() && executableExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function isWithinDirectory(candidate, directory) {
  const relative = path.relative(directory, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function scriptKindFor(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.js':
    case '.mjs':
    case '.cjs':
      return ts.ScriptKind.JS;
    case '.jsx':
      return ts.ScriptKind.JSX;
    case '.tsx':
      return ts.ScriptKind.TSX;
    default:
      return ts.ScriptKind.TS;
  }
}

function propertyName(expression) {
  if (ts.isPropertyAccessExpression(expression)) {
    return expression.name.text.toLowerCase();
  }

  if (
    ts.isElementAccessExpression(expression) &&
    expression.argumentExpression &&
    (ts.isStringLiteral(expression.argumentExpression) || ts.isNoSubstitutionTemplateLiteral(expression.argumentExpression))
  ) {
    return expression.argumentExpression.text.toLowerCase();
  }

  return null;
}

function literalHttpMethod(expression) {
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return expression.text.toLowerCase();
  }

  return null;
}

function objectHasMutatingMethod(expression) {
  if (!ts.isObjectLiteralExpression(expression)) {
    return false;
  }

  for (const property of expression.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text.toLowerCase() : null;
    if (name === 'method' && mutatingMethods.has(literalHttpMethod(property.initializer))) {
      return true;
    }
  }

  return false;
}

function resolveRelativeImport(importerPath, specifier) {
  const unresolved = path.resolve(path.dirname(importerPath), specifier);
  const candidates = [
    unresolved,
    ...Array.from(executableExtensions, (extension) => `${unresolved}${extension}`),
    ...Array.from(executableExtensions, (extension) => path.join(unresolved, `index${extension}`))
  ];

  return candidates.find((candidate) => {
    try {
      return statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
}

function inspectSource(filePath, source, root, smokeDirectory, compilerOptions) {
  const failures = [];
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath));

  function inspectImport(specifier) {
    const resolvedModule = ts.resolveModuleName(specifier, filePath, compilerOptions, ts.sys).resolvedModule;
    const resolved = resolvedModule?.resolvedFileName;

    const nodeModulesDirectory = path.join(root, 'node_modules');
    if (
      resolved &&
      isWithinDirectory(resolved, root) &&
      !isWithinDirectory(resolved, nodeModulesDirectory) &&
      !isWithinDirectory(resolved, smokeDirectory)
    ) {
      failures.push(`${filePath}: published-smoke helper must remain inside tests/published-smoke: ${specifier}`);
      return;
    }

    if (!specifier.startsWith('.')) {
      return;
    }

    const unresolved = path.resolve(path.dirname(filePath), specifier);
    if (!isWithinDirectory(unresolved, smokeDirectory)) {
      failures.push(`${filePath}: published-smoke helper must remain inside tests/published-smoke: ${specifier}`);
    } else if (!resolveRelativeImport(filePath, specifier)) {
      failures.push(`${filePath}: local import cannot be resolved for governance: ${specifier}`);
    }
  }

  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      inspectImport(node.moduleSpecifier.text);
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      inspectImport(node.arguments[0].text);
    }

    if (ts.isCallExpression(node)) {
      const method = propertyName(node.expression);
      if (method && mutatingMethods.has(method)) {
        failures.push(`${filePath}:${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}: forbidden mutating request call: .${method}()`);
      } else if (method === 'fetch' || (ts.isIdentifier(node.expression) && node.expression.text === 'fetch')) {
        if (node.arguments.some(objectHasMutatingMethod)) {
          failures.push(`${filePath}:${sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1}: forbidden mutating fetch method`);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return failures;
}

export function checkProductionSmokeGovernance(root) {
  const smokeDirectory = path.join(root, smokeRelativePath);
  const primarySmokePath = path.join(root, primarySmokeRelativePath);
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, 'tsconfig.json');
  const compilerOptions = configPath
    ? ts.parseJsonConfigFileContent(ts.readConfigFile(configPath, ts.sys.readFile).config, ts.sys, root).options
    : { moduleResolution: ts.ModuleResolutionKind.NodeNext };
  const failures = [];
  let files = [];

  try {
    files = discoverExecutableFiles(smokeDirectory);
  } catch (error) {
    return {
      files,
      failures: [`cannot discover published-smoke executable files: ${error.message}`]
    };
  }

  const specFiles = files.filter((filePath) => /\.spec\.[cm]?[jt]sx?$/i.test(filePath));
  if (specFiles.length === 0) {
    failures.push('published-smoke project must contain at least one executable spec');
  }

  let primarySource;
  try {
    primarySource = readFileSync(primarySmokePath, 'utf8');
  } catch (error) {
    failures.push(`cannot read primary production smoke guard: ${error.message}`);
  }

  if (primarySource !== undefined) {
    for (const snippet of requiredSnippets) {
      if (!primarySource.includes(snippet)) {
        failures.push(`missing required read-only smoke guard: ${snippet}`);
      }
    }
  }

  for (const filePath of files) {
    const source = readFileSync(filePath, 'utf8');
    failures.push(...inspectSource(filePath, source, root, smokeDirectory, compilerOptions));
  }

  return { files, failures };
}

function runCli() {
  const result = checkProductionSmokeGovernance(process.cwd());
  if (result.failures.length > 0) {
    console.error('Production smoke governance violations found:');
    for (const failure of result.failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Production smoke governance ok (${result.files.length} executable file${result.files.length === 1 ? '' : 's'} scanned)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
