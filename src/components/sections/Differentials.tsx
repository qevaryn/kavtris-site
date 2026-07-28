import { differentiators } from '@/data/differentiators';
import { IconCard } from '@/components/ui/IconCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Differentials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Por que trabalhar connosco" align="center" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {differentiators.map((item) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
