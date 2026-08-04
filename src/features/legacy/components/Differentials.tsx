import { differentiators } from '@/data/differentiators';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Differentials() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-hero-grid bg-[size:80px_80px] opacity-20" aria-hidden="true" />
      <div className="container-section relative">
        <SectionHeading eyebrow="Diferenciais" title="Por que trabalhar com a Qevaryn Systems" align="center" className="[&_h2]:text-white [&_p]:text-white/70" />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
          {differentiators.map((item, index) => (
            <article key={item.title} className={`rounded-2xl border border-white/10 bg-white p-5 text-navy-800 shadow-card ${index === differentiators.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-600/10 text-gold-600 ring-1 ring-gold-600/15">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-snug sm:text-base">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
