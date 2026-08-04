import { AlertTriangle, Clock, FileText, MapPin } from 'lucide-react';

type FieldOpsManagementDashboardProps = {
  sectorName: string;
  dashboardState: string;
};

const stats = [
  ['Ativos', '12'],
  ['Agendados', '28'],
  ['Atrasados', '2'],
  ['Incidentes', '3'],
  ['Aprovações', '5']
] as const;

const dashboardRows = [
  ['Serviço ativo', 'Em curso', Clock],
  ['Relatório disponível', 'Concluído', FileText],
  ['Incidente a rever', 'Pendente', AlertTriangle],
  ['Cliente ou local', 'Filtrado por equipa', MapPin]
] as const;

export function FieldOpsManagementDashboard({ sectorName, dashboardState }: FieldOpsManagementDashboardProps) {
  return (
    <article className="min-w-0 rounded-[1.8rem] border border-borderline bg-white p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Painel de gestão</p>
          <h3 className="mt-2 text-2xl font-semibold text-navy-950">{dashboardState}</h3>
        </div>
        <span className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">{sectorName}</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper p-4">
            <p className="text-xs font-semibold text-slate-600">{label}</p>
            <p className="mt-1 text-2xl font-bold text-navy-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {dashboardRows.map(([title, status, Icon]) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl border border-borderline p-4">
            <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-navy-900">{title}</p>
              <p className="text-sm text-slate-600">{status}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
