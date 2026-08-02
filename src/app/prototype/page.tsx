"use client";

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  Blocks,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Gauge,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Network,
  Play,
  Rocket,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  X
} from 'lucide-react';

const solutions = [
  {
    id: 'web',
    label: 'Sistemas Web',
    eyebrow: 'Gestão centralizada',
    title: 'Uma plataforma para controlar toda a operação.',
    description:
      'Painéis administrativos, permissões, clientes, tarefas, documentos, indicadores e integrações num único sistema.',
    features: ['Dashboard em tempo real', 'Perfis e permissões', 'Relatórios e histórico'],
    metrics: [
      ['Processos ativos', '128'],
      ['Tempo poupado', '42h'],
      ['Aprovação', '86%']
    ]
  },
  {
    id: 'mobile',
    label: 'Aplicações Mobile',
    eyebrow: 'Serviço na mão do utilizador',
    title: 'Aplicações úteis, rápidas e ligadas ao seu negócio.',
    description:
      'Apps para clientes, equipas externas, reservas, notificações, acompanhamento de serviços e comunicação.',
    features: ['Android e iOS', 'Notificações', 'Experiência responsiva'],
    metrics: [
      ['Utilizadores', '2.4k'],
      ['Avaliação', '4.8'],
      ['Retenção', '74%']
    ]
  },
  {
    id: 'automation',
    label: 'Automação',
    eyebrow: 'Menos tarefas repetitivas',
    title: 'Fluxos que validam, encaminham e atualizam automaticamente.',
    description:
      'Ligamos formulários, sistemas, aprovações, notificações e relatórios para reduzir trabalho manual e erros.',
    features: ['Regras automáticas', 'Integrações e APIs', 'Alertas inteligentes'],
    metrics: [
      ['Tarefas eliminadas', '36'],
      ['Execuções', '1.8k'],
      ['Erros evitados', '17']
    ]
  },
  {
    id: 'saas',
    label: 'Produtos SaaS',
    eyebrow: 'Receita recorrente',
    title: 'Transforme um processo recorrente num produto digital.',
    description:
      'Criamos plataformas multiempresa com planos, pagamentos, área de cliente, métricas e gestão de subscrições.',
    features: ['Multiempresa', 'Planos e pagamentos', 'Área de cliente'],
    metrics: [
      ['Empresas', '24'],
      ['MRR simulado', '€8.2k'],
      ['Atividade', '92%']
    ]
  }
] as const;

const products = [
  {
    name: 'Qevaryn Ops',
    category: 'Operações',
    description: 'Pedidos, tarefas, aprovações, documentos e indicadores numa só plataforma.',
    icon: LayoutDashboard,
    accent: 'from-cyan-400/25 to-blue-500/5'
  },
  {
    name: 'CareFlow',
    category: 'Serviços',
    description: 'Escalas, visitas, profissionais, familiares, relatórios e alertas.',
    icon: ShieldCheck,
    accent: 'from-emerald-400/25 to-teal-500/5'
  },
  {
    name: 'KitchenSync',
    category: 'Restauração',
    description: 'Atendimento, cozinha, preparação e entrega sincronizados em tempo real.',
    icon: Workflow,
    accent: 'from-amber-400/25 to-orange-500/5'
  },
  {
    name: 'FieldControl',
    category: 'Equipas externas',
    description: 'Rotas, check-in, formulários, fotografias e acompanhamento de equipas.',
    icon: Smartphone,
    accent: 'from-violet-400/25 to-purple-500/5'
  }
];

const workflowSteps = [
  ['01', 'Diagnóstico', 'Entendemos o problema, os utilizadores e o impacto esperado.'],
  ['02', 'Arquitetura', 'Definimos fluxos, prioridades, integrações e riscos.'],
  ['03', 'Protótipo', 'Criamos uma experiência navegável antes de desenvolver tudo.'],
  ['04', 'Construção', 'Entregamos por fases, com validação contínua.'],
  ['05', 'Qualidade', 'Testamos, monitorizamos e evoluímos o produto.']
];

export default function PrototypePage() {
  const [activeSolution, setActiveSolution] = useState<(typeof solutions)[number]['id']>('web');
  const [activeProduct, setActiveProduct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionType, setSolutionType] = useState('web');
  const [features, setFeatures] = useState(7);
  const [integrations, setIntegrations] = useState(2);
  const [profiles, setProfiles] = useState(3);

  const selectedSolution = solutions.find((item) => item.id === activeSolution) ?? solutions[0];
  const SelectedProductIcon = products[activeProduct].icon;

  const estimate = useMemo(() => {
    const score = features + integrations * 2 + profiles * 1.5 + (solutionType === 'both' ? 5 : solutionType === 'saas' ? 6 : 2);
    if (score < 17) return { complexity: 'Baixa', timeline: '4–7 semanas', format: 'MVP simples' };
    if (score < 28) return { complexity: 'Média', timeline: '8–12 semanas', format: 'MVP profissional' };
    return { complexity: 'Alta', timeline: '13–20 semanas', format: 'Produto por fases' };
  }, [features, integrations, profiles, solutionType]);

  return (
    <div className="min-h-screen bg-[#020B14] text-white selection:bg-[#F2B632] selection:text-[#03182B]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020B14]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#F2B632]/50 bg-[#F2B632]/10 shadow-[0_0_40px_rgba(242,182,50,0.12)]">
              <Blocks className="h-5 w-5 text-[#F2B632]" />
            </div>
            <div>
              <p className="text-sm font-black tracking-[0.15em]">QEVARYN SYSTEMS</p>
              <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">Qualidade é Vida Systems</p>
            </div>
          </a>

          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 flex-col gap-6 border-b border-white/10 bg-[#03111F] p-6 lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}>
            {[
              ['Soluções', '#solucoes'],
              ['Produtos', '#produtos'],
              ['Processo', '#processo'],
              ['Simulador', '#simulador']
            ].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-white/66 transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contacto" className="hidden rounded-full bg-[#F2B632] px-5 py-3 text-sm font-black text-[#03182B] transition hover:-translate-y-0.5 sm:inline-flex">
              Pedir diagnóstico
            </a>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden border-b border-white/8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_18%_36%,rgba(242,182,50,0.10),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative mx-auto grid min-h-[760px] max-w-[1240px] items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B632]/25 bg-[#F2B632]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F2C85A]">
                <Sparkles className="h-3.5 w-3.5" /> Produto digital, não apenas um site
              </div>
              <h1 className="mt-8 max-w-[760px] text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.87] tracking-[-0.07em]">
                Criamos sistemas que <span className="bg-gradient-to-r from-[#F2B632] to-[#FFE08A] bg-clip-text text-transparent">trabalham com o seu negócio.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/64">
                Sistemas web, aplicações mobile, automação, integrações e produtos SaaS concebidos para reduzir tarefas manuais, aumentar controlo e criar novas oportunidades.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#produtos" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#F2B632] px-6 font-black text-[#03182B] transition hover:-translate-y-1">
                  Explorar produtos <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#simulador" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/4 px-6 font-bold transition hover:border-[#F2B632]/50 hover:bg-[#F2B632]/8">
                  Montar uma solução <Settings2 className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {['Web Apps', 'Mobile Apps', 'SaaS', 'Dashboards', 'Automação', 'QA'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-white/55">{tag}</span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-12 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#071B30]/80 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/8 px-3 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-emerald-300">Demonstração</span>
                </div>

                <div className="grid gap-4 pt-4 md:grid-cols-[160px_1fr]">
                  <aside className="hidden rounded-2xl border border-white/8 bg-black/15 p-4 md:block">
                    <p className="text-xs font-black tracking-[0.14em] text-[#F2B632]">QEVARYN OPS</p>
                    <div className="mt-6 space-y-2">
                      {[
                        [LayoutDashboard, 'Visão geral'],
                        [Workflow, 'Processos'],
                        [Network, 'Integrações'],
                        [LineChart, 'Relatórios']
                      ].map(([Icon, label], index) => {
                        const NavIcon = Icon as typeof LayoutDashboard;
                        return (
                          <div key={label as string} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ${index === 0 ? 'bg-white/8 text-white' : 'text-white/40'}`}>
                            <NavIcon className="h-4 w-4" /> {label as string}
                          </div>
                        );
                      })}
                    </div>
                  </aside>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40">Bom dia, Gabriel</p>
                        <h2 className="mt-1 text-xl font-black">Painel de operações</h2>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5"><Bell className="h-4 w-4 text-[#F2B632]" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        ['Processos', '128', '+14%'],
                        ['Aprovados', '86%', '+8%'],
                        ['Tempo poupado', '42h', '+21%']
                      ].map(([label, value, growth]) => (
                        <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                          <p className="text-[0.64rem] uppercase tracking-[0.12em] text-white/35">{label}</p>
                          <p className="mt-2 text-2xl font-black">{value}</p>
                          <p className="mt-1 text-[0.65rem] font-bold text-emerald-300">{growth}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                      <div className="flex items-center justify-between"><p className="text-sm font-bold">Eficiência semanal</p><span className="text-xs text-white/35">Últimos 7 dias</span></div>
                      <div className="mt-6 flex h-40 items-end gap-2">
                        {[36, 54, 48, 74, 66, 88, 96, 82, 100, 112, 105, 126].map((height, index) => (
                          <div key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-blue-500/40 to-[#F2B632]" style={{ height }} />
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><p className="text-xs text-white/35">Automação ativa</p><div className="mt-3 flex items-center gap-3"><Bot className="h-8 w-8 text-[#F2B632]" /><div><p className="font-black">36 fluxos</p><p className="text-xs text-white/40">sem erros críticos</p></div></div></div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><p className="text-xs text-white/35">Qualidade</p><div className="mt-3 flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-emerald-300" /><div><p className="font-black">98.4%</p><p className="text-xs text-white/40">testes aprovados</p></div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#03111F]">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px bg-white/8 px-5 sm:grid-cols-4 sm:px-8">
            {[
              ['Web + Mobile', 'Ecossistemas integrados'],
              ['QA desde o início', 'Menos retrabalho'],
              ['Protótipo primeiro', 'Validação antes do investimento'],
              ['Evolução contínua', 'Produto cresce com o negócio']
            ].map(([title, subtitle]) => (
              <div key={title} className="bg-[#03111F] px-5 py-7"><p className="font-black">{title}</p><p className="mt-1 text-xs text-white/38">{subtitle}</p></div>
            ))}
          </div>
        </section>

        <section id="solucoes" className="bg-[#F3F6F8] py-24 text-[#071525] sm:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B07C00]">Explore o que podemos criar</p>
              <h2 className="mt-5 text-[clamp(2.8rem,6vw,5.6rem)] font-black leading-[0.92] tracking-[-0.06em]">Não vendemos apenas desenvolvimento. Criamos produtos digitais.</h2>
            </div>

            <div className="mt-14 flex gap-2 overflow-x-auto pb-3">
              {solutions.map((solution) => (
                <button key={solution.id} type="button" onClick={() => setActiveSolution(solution.id)} className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${activeSolution === solution.id ? 'bg-[#071525] text-white' : 'border border-[#CBD5DF] bg-white text-[#536172] hover:border-[#071525]'}`}>
                  {solution.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-[#D7E0E8] bg-white shadow-[0_30px_90px_rgba(7,21,37,0.10)] lg:grid-cols-[0.88fr_1.12fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B07C00]">{selectedSolution.eyebrow}</p>
                <h3 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em]">{selectedSolution.title}</h3>
                <p className="mt-5 text-base leading-7 text-[#607083]">{selectedSolution.description}</p>
                <div className="mt-8 space-y-3">
                  {selectedSolution.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm font-bold text-[#26384B]"><CheckCircle2 className="h-5 w-5 text-[#B07C00]" /> {feature}</div>
                  ))}
                </div>
                <a href="#simulador" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#071525] px-5 py-3 text-sm font-black text-white">Adaptar esta solução <ArrowRight className="h-4 w-4" /></a>
              </div>

              <div className="relative min-h-[520px] overflow-hidden bg-[#07192C] p-6 text-white sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.20),transparent_34%)]" />
                <div className="relative rounded-[1.5rem] border border-white/10 bg-[#0B223B] p-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/8 pb-4"><p className="font-black">{selectedSolution.label}</p><span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-300">Ativo</span></div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {selectedSolution.metrics.map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><p className="text-[0.65rem] uppercase tracking-[0.1em] text-white/35">{label}</p><p className="mt-2 text-xl font-black">{value}</p></div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                    <div className="flex items-center justify-between"><p className="text-sm font-bold">Atividade</p><Gauge className="h-4 w-4 text-[#F2B632]" /></div>
                    <div className="mt-5 space-y-3">
                      {[92, 76, 64, 48].map((value, index) => (
                        <div key={index}><div className="mb-2 flex justify-between text-xs text-white/40"><span>{['Operação', 'Automação', 'Qualidade', 'Integrações'][index]}</span><span>{value}%</span></div><div className="h-2 rounded-full bg-white/6"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#F2B632]" style={{ width: `${value}%` }} /></div></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><MonitorSmartphone className="h-7 w-7 text-blue-300" /><p className="mt-4 font-black">Experiência ligada</p><p className="mt-1 text-xs leading-5 text-white/40">Web e mobile partilham dados, permissões e histórico.</p></div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><LockKeyhole className="h-7 w-7 text-[#F2B632]" /><p className="mt-4 font-black">Controlo seguro</p><p className="mt-1 text-xs leading-5 text-white/40">Acessos, validações e registos de atividade.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="produtos" className="border-y border-white/8 bg-[#020B14] py-24 sm:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F2B632]">Laboratório de produtos</p>
                <h2 className="mt-5 text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.06em]">Veja a ideia antes de pedir um orçamento.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/50">Produtos-conceito demonstram como uma solução pode funcionar. Não são apresentados como projetos já entregues.</p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-[320px_1fr]">
              <div className="space-y-3">
                {products.map((product, index) => (
                  <button key={product.name} type="button" onClick={() => setActiveProduct(index)} className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${activeProduct === index ? 'border-[#F2B632]/45 bg-[#F2B632]/10' : 'border-white/8 bg-white/[0.025] hover:border-white/18'}`}>
                    <div><p className="font-black">{product.name}</p><p className="mt-1 text-xs text-white/38">{product.category}</p></div><ChevronRight className={`h-4 w-4 ${activeProduct === index ? 'text-[#F2B632]' : 'text-white/25'}`} />
                  </button>
                ))}
              </div>

              <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${products[activeProduct].accent} p-7 sm:p-10`}>
                <div className="absolute inset-0 bg-[#071525]/75" />
                <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/12 bg-white/6"><SelectedProductIcon className="h-8 w-8 text-[#F2B632]" /></div>
                    <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#F2B632]">{products[activeProduct].category}</p>
                    <h3 className="mt-3 text-4xl font-black tracking-[-0.045em]">{products[activeProduct].name}</h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/52">{products[activeProduct].description}</p>
                    <div className="mt-7 flex flex-wrap gap-2">{['Web', 'Mobile', 'Dashboard', 'Automação'].map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/55">{tag}</span>)}</div>
                  </div>

                  <div className="relative mx-auto w-full max-w-[440px] rounded-[2rem] border border-white/10 bg-[#091C30] p-4 shadow-[0_35px_80px_rgba(0,0,0,0.45)]">
                    <div className="rounded-[1.45rem] bg-[#F2F5F7] p-4 text-[#071525]">
                      <div className="flex items-center justify-between"><div><p className="text-xs text-[#738092]">Bem-vindo</p><p className="font-black">Painel principal</p></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#071525] text-white"><Bell className="h-4 w-4" /></div></div>
                      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#071525] to-[#143A5E] p-5 text-white"><p className="text-xs text-white/45">Resultado do dia</p><p className="mt-2 text-3xl font-black">+24%</p><p className="mt-1 text-xs text-emerald-300">desempenho acima da média</p></div>
                      <div className="mt-4 grid grid-cols-2 gap-3">{['Tarefas', 'Clientes', 'Alertas', 'Relatórios'].map((item, index) => <div key={item} className="rounded-2xl border border-[#DFE5EB] bg-white p-4"><p className="text-xs text-[#718094]">{item}</p><p className="mt-2 text-xl font-black">{[18, 42, 3, 12][index]}</p></div>)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="processo" className="bg-[#F3F6F8] py-24 text-[#071525] sm:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#B07C00]">Como trabalhamos</p><h2 className="mt-5 text-[clamp(2.8rem,6vw,5.4rem)] font-black leading-[0.92] tracking-[-0.06em]">Menos promessa. Mais validação.</h2></div>
            <div className="mt-14 grid gap-4 lg:grid-cols-5">
              {workflowSteps.map(([number, title, text], index) => (
                <article key={number} className="group relative rounded-[1.5rem] border border-[#D9E1E8] bg-white p-6 transition hover:-translate-y-2 hover:border-[#B07C00]/40 hover:shadow-xl">
                  <div className="flex items-center justify-between"><span className="text-sm font-black text-[#B07C00]">{number}</span>{index < workflowSteps.length - 1 ? <ArrowRight className="hidden h-4 w-4 text-[#B07C00]/35 lg:block" /> : <Rocket className="h-4 w-4 text-[#B07C00]" />}</div>
                  <h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657487]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="simulador" className="border-t border-white/8 bg-[#020B14] py-24 sm:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F2B632]">Simulador interativo</p>
                <h2 className="mt-5 text-[clamp(2.8rem,6vw,5.3rem)] font-black leading-[0.92] tracking-[-0.06em]">Monte uma primeira versão da sua solução.</h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-white/50">A estimativa serve para orientar a conversa. O valor real depende dos requisitos, riscos, integrações e nível de qualidade.</p>
              </div>

              <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#061525] lg:grid-cols-2">
                <div className="border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-white/45">Tipo de solução</label>
                  <select value={solutionType} onChange={(event) => setSolutionType(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold outline-none">
                    <option value="web" className="bg-[#071525]">Sistema web</option><option value="mobile" className="bg-[#071525]">Aplicação mobile</option><option value="both" className="bg-[#071525]">Web + mobile</option><option value="saas" className="bg-[#071525]">Produto SaaS</option>
                  </select>
                  {[
                    ['Funcionalidades', features, setFeatures, 3, 18],
                    ['Integrações', integrations, setIntegrations, 0, 8],
                    ['Perfis de utilizador', profiles, setProfiles, 1, 6]
                  ].map(([label, value, setter, min, max]) => (
                    <div key={label as string} className="mt-7">
                      <div className="flex justify-between text-sm font-bold"><span>{label as string}</span><span className="text-[#F2B632]">{value as number}</span></div>
                      <input type="range" min={min as number} max={max as number} value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="mt-4 w-full accent-[#F2B632]" />
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(242,182,50,0.10),transparent_35%)]" />
                  <div className="relative">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-[#F2B632]">Resultado sugerido</p>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.04em]">{solutionType === 'both' ? 'Ecossistema web + mobile' : solutionType === 'saas' ? 'Produto SaaS' : solutionType === 'mobile' ? 'Aplicação mobile' : 'Sistema web profissional'}</h3>
                    <p className="mt-4 text-sm leading-6 text-white/44">Versão inicial com {profiles} perfis, {features} funcionalidades e {integrations} integrações externas.</p>
                    <div className="mt-7 space-y-3">
                      {[
                        ['Complexidade', estimate.complexity],
                        ['Prazo indicativo', estimate.timeline],
                        ['Formato recomendado', estimate.format]
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-4"><span className="text-xs text-white/40">{label}</span><strong className="text-sm">{value}</strong></div>
                      ))}
                    </div>
                    <a href="#contacto" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F2B632] px-5 py-3.5 text-sm font-black text-[#071525]">Transformar em diagnóstico <ArrowRight className="h-4 w-4" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-[#F2B632] py-20 text-[#071525]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-black uppercase tracking-[0.2em]">Começar pequeno</p><h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-black leading-[0.95] tracking-[-0.055em]">Validamos a solução antes de construir tudo.</h2></div>
            <a href="/" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#071525] px-7 font-black text-white">Voltar ao site atual <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#020B14] py-10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 text-sm text-white/38 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="font-black tracking-[0.12em] text-white">QEVARYN SYSTEMS</p><p className="mt-1">Empresa operadora de tecnologia da Rede Qualidade é Vida.</p></div>
          <div className="flex flex-wrap gap-5"><span>Software</span><span>Automation</span><span>Quality</span><span>Innovation</span></div>
        </div>
      </footer>
    </div>
  );
}
