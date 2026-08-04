import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const sourceExtensions = new Set(['.ts', '.tsx']);

const rules = [
  {
    name: 'domain must stay pure',
    folder: path.join(sourceRoot, 'domain'),
    forbidden: [
      /^@\/app(?:\/|$)/,
      /^@\/features(?:\/|$)/,
      /^@\/components(?:\/|$)/,
      /^@\/server(?:\/|$)/,
      /^@\/services(?:\/|$)/,
      /^next(?:\/|$)/,
      /^react(?:\/|$)/
    ]
  },
  {
    name: 'features must not import server or provider implementations',
    folder: path.join(sourceRoot, 'features'),
    forbidden: [/^@\/server(?:\/|$)/, /^@\/services\/email\/resend$/]
  },
  {
    name: 'server must not import visual layers',
    folder: path.join(sourceRoot, 'server'),
    forbidden: [/^@\/app(?:\/|$)/, /^@\/features(?:\/|$)/, /^@\/components(?:\/|$)/, /^next\/image$/, /^react(?:\/|$)/]
  },
  {
    name: 'services must not import visual layers',
    folder: path.join(sourceRoot, 'services'),
    forbidden: [/^@\/app(?:\/|$)/, /^@\/features(?:\/|$)/, /^@\/components(?:\/|$)/, /^next\/image$/, /^react(?:\/|$)/]
  }
];

function listSourceFiles(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })?.isDirectory()) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(fullPath);
    }
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

function getImports(source) {
  const imports = [];
  const patterns = [
    /import\s+(?:type\s+)?(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/g,
    /export\s+(?:type\s+)?(?:[^'"]+\s+from\s+)['"]([^'"]+)['"]/g
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      imports.push(match[1]);
    }
  }

  return imports;
}

const violations = [];

for (const rule of rules) {
  for (const file of listSourceFiles(rule.folder)) {
    const source = readFileSync(file, 'utf8');
    for (const importPath of getImports(source)) {
      if (rule.forbidden.some((pattern) => pattern.test(importPath))) {
        violations.push({
          rule: rule.name,
          file: path.relative(root, file),
          importPath
        });
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Architecture boundary violations found:');
  for (const violation of violations) {
    console.error(`- ${violation.rule}: ${violation.file} imports ${violation.importPath}`);
  }
  process.exit(1);
}

console.log('Architecture boundaries ok');
