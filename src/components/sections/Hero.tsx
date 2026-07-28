import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

const metrics = [
  { label: 'Execuções', value: '256' },
  { label: 'Aprovados', value: '221' },
  { label: 'Falhas', value: '35' },
  { label: 'Tempo médio', value: '2m 45s' }
];

const bugs = [
  'Filtro não persistia no Safari',
  'Validação do formulário insuficiente',
  'Alinhamento quebrado em tablet'
];

const environments = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Staging'];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:72px_72px] opacity-30" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold-600/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Qualidade é Vida Tech</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl xl:text-[4.7rem]">
            Lance aplicações web <span className="text-gold-500">com menos falhas</span> e <span className="text-gold-500">mais confiança</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
            Ajudamos empresas de software, startups e agências de desenvolvimento através de QA manual, automação de testes e acompanhamento contínuo da qualidade.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contacto">Pedir uma análise</Button>
            <Button href="#servicos" variant="secondary">
              Conhecer os serviços
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {['Playwright', 'TypeScript', 'Robot Framework', 'Python', 'SeleniumLibrary'].map((tag) => (
              <Tag key={tag} tone="gold">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold-500">Painel de Qualidade</p>
                <p className="mt-1 text-sm text-white/65">Visão executiva ilustrativa</p>
              </div>
              <div className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-500">86,3% aprovação</div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-navy-900/80 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/50">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Evolução semanal</span>
                    <span>Últimos 7 dias</span>
                  </div>
                  <svg viewBox="0 0 320 130" className="mt-4 h-32 w-full" role="img" aria-label="Gráfico de evolução da qualidade">
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F2B632" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#D99A16" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path d="M12 98 C42 82, 58 78, 78 84 S120 95, 144 72 S188 34, 212 50 S260 86, 308 28" fill="none" stroke="url(#lineGradient)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M12 98 C42 82, 58 78, 78 84 S120 95, 144 72 S188 34, 212 50 S260 86, 308 28 L308 126 L12 126 Z" fill="url(#lineGradient)" opacity="0.18" />
                    {[12, 78, 144, 212, 308].map((x, index) => (
                      <circle key={index} cx={x} cy={[98, 84, 72, 50, 28][index]} r="4.5" fill="#F2B632" />
                    ))}
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Aprovação</span>
                    <span>86,3%</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                        <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          stroke="#F2B632"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="301.59"
                          strokeDashoffset="41.1"
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center text-center">
                        <div>
                          <p className="text-3xl font-semibold text-white">86,3%</p>
                          <p className="text-xs uppercase tracking-[0.22em] text-white/55">Aprovados</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <div>
                    <p className="text-sm font-medium text-white">Bugs recentes</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {bugs.map((bug) => (
                        <li key={bug} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                          <span>{bug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Ambientes</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {environments.map((environment) => (
                        <span key={environment} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          {environment}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
