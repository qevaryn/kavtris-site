import { problems } from '@/data/problems';
import { IconCard } from '@/components/ui/IconCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Problems() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="A sua equipa enfrenta algum destes problemas?" align="center" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((problem) => (
            <IconCard key={problem.title} icon={problem.icon} title={problem.title} description={problem.description} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-600">
          A Qualidade é Vida Tech transforma esses problemas num processo de qualidade mais claro, confiável e previsível.
        </p>
      </div>
    </section>
  );
}
