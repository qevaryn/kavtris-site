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
      <svg className="absolute left-0 top-24 hidden h-[420px] w-52 text-gold-600/45 lg:block" viewBox="0 0 210 420" fill="none" aria-hidden="true">
        <path d="M0 28H48L76 56H128" stroke="currentColor" />
        <path d="M0 88H35L64 117H120" stroke="currentColor" />
        <path d="M0 164H58L88 134H148" stroke="currentColor" />
        <path d="M0 252H46L84 290H154" stroke="currentColor" />
        <path d="M0 336H38L72 302H132" stroke="currentColor" />
        {[128, 120, 148, 154, 132].map((x, index) => (
          <circle key={index} cx={x} cy={[56, 117, 134, 290, 302][index]} r="4" fill="currentColor" />
        ))}
      </svg>
      <svg className="absolute right-0 top-24 hidden h-[420px] w-52 scale-x-[-1] text-gold-600/45 lg:block" viewBox="0 0 210 420" fill="none" aria-hidden="true">
        <path d="M0 28H48L76 56H128" stroke="currentColor" />
        <path d="M0 88H35L64 117H120" stroke="currentColor" />
        <path d="M0 164H58L88 134H148" stroke="currentColor" />
        <path d="M0 252H46L84 290H154" stroke="currentColor" />
        <path d="M0 336H38L72 302H132" stroke="currentColor" />
        {[128, 120, 148, 154, 132].map((x, index) => (
          <circle key={index} cx={x} cy={[56, 117, 134, 290, 302][index]} r="4" fill="currentColor" />
        ))}
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16 xl:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Qualidade é Vida Tech</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-[3.7rem] xl:text-[4rem]">
            Lance aplicações web <br className="hidden sm:block" />
            com <span className="text-gold-500">menos falhas</span> e <br className="hidden sm:block" />
            <span className="text-gold-500">mais confiança</span>.
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
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold-500">Painel de Qualidade</p>
                <p className="mt-1 text-sm text-white/65">Visão executiva ilustrativa</p>
              </div>
              <div className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-500">86,3% aprovação</div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1.25fr_0.85fr]">
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
                  <svg viewBox="0 0 360 140" className="mt-4 h-36 w-full" role="img" aria-label="Gráfico de evolução da qualidade">
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F2B632" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#D99A16" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path d="M12 98 C42 82, 58 78, 78 84 S120 95, 144 72 S188 34, 212 50 S275 86, 348 28" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                    <path d="M12 118 C42 100, 64 116, 92 104 S136 124, 168 110 S216 92, 248 104 S300 122, 348 94" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    {[12, 78, 144, 212, 348].map((x, index) => (
                      <circle key={index} cx={x} cy={[98, 84, 72, 50, 28][index]} r="4.5" fill="#22c55e" />
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
