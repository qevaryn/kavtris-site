import type { ReactNode } from 'react';
import { AlertTriangle, Camera, ClipboardCheck, Clock, MapPin, UserCheck } from 'lucide-react';

type FieldOpsEmployeeMobileViewProps = {
  sectorName: string;
};

export function FieldOpsEmployeeMobileView({ sectorName }: FieldOpsEmployeeMobileViewProps) {
  return (
    <article className="mx-auto w-full max-w-md rounded-[1.8rem] border border-borderline bg-white p-4 shadow-card lg:mx-0">
      <div className="rounded-[1.45rem] bg-navy-950 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blueLight">FieldOps Mobile</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[0.68rem] font-semibold text-emerald-200">Offline opcional</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 text-navy-950">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-kavtris-blue">Agenda de hoje</p>
          <h3 className="mt-2 text-lg font-semibold">{sectorName} - serviço atribuído</h3>
          <div className="mt-4 grid gap-3">
            <InfoRow icon={<Clock className="h-4 w-4" />} label="Horário" value="09:30 - 11:00" />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Local" value="Cliente / localização atribuída" />
            <InfoRow icon={<ClipboardCheck className="h-4 w-4" />} label="Checklist" value="Pontos preparados para execução" />
            <InfoRow icon={<Camera className="h-4 w-4" />} label="Evidências" value="Fotografias e notas ligadas ao serviço" />
            <InfoRow icon={<AlertTriangle className="h-4 w-4" />} label="Incidente" value="Registo quando algo precisa de revisão" />
            <InfoRow icon={<UserCheck className="h-4 w-4" />} label="Conclusão" value="Confirmação ou check-out quando aplicável" />
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-paper p-3">
      <span className="text-kavtris-blue">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600">{label}</p>
        <p className="mt-1 text-sm text-navy-900">{value}</p>
      </div>
    </div>
  );
}
