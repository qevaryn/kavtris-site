import type { ReactNode } from 'react';
import type { BusinessCategoryId as BusinessId } from '@/features/catalog/data/business-discovery';

/**
 * WEB.1F.3 — restrained inline-SVG business contexts for the discovery cards.
 * No external imagery, no paid assets: geometric scenes on the KAVTRIS deep
 * navy, with silver line-work and restrained electric-blue accents, matching
 * the product-card visual treatment.
 */

const LINE = '#CFE0F0';
const LINE_DIM = '#8FA7C0';
const ACCENT = '#3D7BFF';
const ACCENT_DIM = '#7FA8FF';

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={title} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#040B1C" />
      <g stroke="rgba(255,255,255,0.045)" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`gv${i}`} x1={i * 64} y1="0" x2={i * 64} y2="400" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`gh${i}`} x1="0" y1={i * 80} x2="640" y2={i * 80} />
        ))}
      </g>
      {children}
    </svg>
  );
}

function Sparkle({ x, y, size = 10 }: { x: number; y: number; size?: number }) {
  return (
    <g stroke={ACCENT_DIM} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1={x - size} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y - size} x2={x} y2={y + size} />
    </g>
  );
}

function BarbeariasVisual() {
  return (
    <Frame title="Barbearias e salões — contexto de negócio">
      <g>
        <rect x="120" y="120" width="52" height="200" rx="26" fill="none" stroke={LINE} strokeWidth="3" />
        <clipPath id="web1f3-pole">
          <rect x="120" y="120" width="52" height="200" rx="26" />
        </clipPath>
        <g clipPath="url(#web1f3-pole)" stroke={ACCENT} strokeWidth="6" opacity="0.85">
          <line x1="110" y1="150" x2="184" y2="96" />
          <line x1="112" y1="190" x2="184" y2="138" />
          <line x1="114" y1="230" x2="184" y2="178" />
          <line x1="116" y1="270" x2="184" y2="218" />
          <line x1="118" y1="310" x2="184" y2="258" />
        </g>
        <line x1="148" y1="96" x2="148" y2="344" stroke={LINE} strokeWidth="2" opacity="0.4" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <ellipse cx="400" cy="208" rx="30" ry="14" transform="rotate(-34 400 208)" />
        <ellipse cx="446" cy="182" rx="30" ry="14" transform="rotate(36 446 182)" />
        <line x1="428" y1="194" x2="508" y2="252" />
        <line x1="452" y1="168" x2="516" y2="224" />
        <circle cx="388" cy="220" r="9" fill="none" />
        <circle cx="456" cy="170" r="9" fill="none" />
        <line x1="508" y1="252" x2="516" y2="258" />
        <line x1="516" y1="224" x2="524" y2="230" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none" aria-hidden="true">
        <rect x="350" y="292" width="86" height="16" rx="4" />
        <line x1="356" y1="308" x2="356" y2="326" />
        <line x1="368" y1="308" x2="368" y2="326" />
        <line x1="380" y1="308" x2="380" y2="326" />
        <line x1="392" y1="308" x2="392" y2="326" />
        <line x1="404" y1="308" x2="404" y2="326" />
        <line x1="416" y1="308" x2="416" y2="326" />
        <line x1="428" y1="308" x2="428" y2="326" />
      </g>
      <Sparkle x={540} y={140} />
      <Sparkle x={250} y={330} size={7} />
    </Frame>
  );
}


function RestaurantesVisual() {
  return (
    <Frame title="Restaurantes — contexto de negócio">
      <g stroke={LINE_DIM} strokeWidth="3" fill="none" strokeLinecap="round" aria-hidden="true">
        <path d="M268 104 q-8 -12 0 -24 q8 -12 0 -24" />
        <path d="M330 92 q-8 -12 0 -24 q8 -12 0 -24" />
        <path d="M392 104 q-8 -12 0 -24 q8 -12 0 -24" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none">
        <circle cx="330" cy="236" r="96" />
        <circle cx="330" cy="236" r="62" opacity="0.65" />
        <circle cx="330" cy="236" r="22" stroke={ACCENT} />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="188" y1="250" x2="188" y2="160" />
        <line x1="178" y1="158" x2="178" y2="196" />
        <line x1="188" y1="156" x2="188" y2="196" />
        <line x1="198" y1="158" x2="198" y2="196" />
        <path d="M172 200 q-8 34 16 50" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <line x1="474" y1="250" x2="474" y2="156" />
        <path d="M474 250 q10 30 4 48" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="3" fill="none" aria-hidden="true">
        <path d="M500 300 l14 34 h24 l14 -34 z" />
        <line x1="500" y1="300" x2="552" y2="300" />
      </g>
      <Sparkle x={110} y={120} />
      <Sparkle x={560} y={120} size={7} />
    </Frame>
  );
}

function HoteisVisual() {
  return (
    <Frame title="Hotéis e alojamento — contexto de negócio">
      <g fill="none" stroke={LINE_DIM} strokeWidth="3" aria-hidden="true">
        <circle cx="520" cy="110" r="34" />
        <circle cx="534" cy="100" r="28" fill="#040B1C" stroke="none" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <rect x="170" y="130" width="300" height="190" rx="10" />
        <path d="M196 130 v-26 h248 v26" />
        <path d="M196 104 l-14 26" />
      </g>
      <g fill="none" stroke={ACCENT} strokeWidth="2" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect key={`w${r}-${c}`} x={216 + c * 70} y={160 + r * 34} width="30" height="20" rx="3" />
          ))
        )}
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none">
        <rect x="290" y="272" width="60" height="48" rx="4" />
        <circle cx="320" cy="296" r="4" fill={ACCENT} stroke="none" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" aria-hidden="true">
        <circle cx="140" cy="330" r="16" />
        <line x1="156" y1="330" x2="224" y2="330" />
        <line x1="210" y1="330" x2="210" y2="344" />
        <line x1="198" y1="330" x2="198" y2="342" />
      </g>
      <Sparkle x={560} y={320} size={7} />
    </Frame>
  );
}

function LojasVisual() {
  return (
    <Frame title="Lojas e retalho — contexto de negócio">
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M180 128 h300 l22 34 h-344 z" />
        <path d="M180 128 q-14 -6 -26 0" />
      </g>
      <g stroke={ACCENT} strokeWidth="4" strokeLinecap="round" aria-hidden="true">
        <line x1="210" y1="128" x2="222" y2="162" />
        <line x1="270" y1="128" x2="282" y2="162" />
        <line x1="330" y1="128" x2="342" y2="162" />
        <line x1="390" y1="128" x2="402" y2="162" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none">
        <rect x="196" y="162" width="248" height="148" rx="8" />
        <line x1="320" y1="162" x2="320" y2="310" />
        <rect x="204" y="176" width="108" height="72" rx="4" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none" aria-hidden="true">
        <line x1="208" y1="192" x2="308" y2="192" />
        <line x1="208" y1="204" x2="280" y2="204" />
        <line x1="208" y1="216" x2="290" y2="216" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M440 236 v-30 a16 16 0 0 1 32 0 v30" />
        <path d="M432 236 h48 v56 a8 8 0 0 1 -8 8 h-32 a8 8 0 0 1 -8 -8 z" />
        <line x1="440" y1="252" x2="456" y2="252" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none" aria-hidden="true">
        <path d="M120 300 h24 l12 12 v36" />
        <path d="M120 348 h48" />
      </g>
      <Sparkle x={540} y={330} size={7} />
    </Frame>
  );
}

function TerrenoVisual() {
  return (
    <Frame title="Equipas no terreno — contexto de negócio">
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <rect x="150" y="200" width="260" height="84" rx="12" />
        <path d="M360 200 v-48 h76 l50 48 z" />
        <path d="M318 200 v-30 h42 v30" />
        <line x1="330" y1="172" x2="362" y2="172" />
        <line x1="330" y1="184" x2="354" y2="184" />
        <circle cx="206" cy="296" r="24" />
        <circle cx="380" cy="296" r="24" />
        <circle cx="206" cy="296" r="10" fill="#040B1C" />
        <circle cx="380" cy="296" r="10" fill="#040B1C" />
      </g>
      <g stroke={ACCENT} strokeWidth="3" fill="none" aria-hidden="true">
        <line x1="206" y1="318" x2="206" y2="344" />
        <line x1="380" y1="318" x2="380" y2="344" />
        <line x1="200" y1="344" x2="386" y2="344" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none" strokeDasharray="2 8" aria-hidden="true">
        <path d="M476 250 q40 -10 20 40 q-20 50 20 60" />
      </g>
      <g fill={ACCENT} stroke="none">
        <circle cx="496" cy="238" r="7" />
        <circle cx="516" cy="356" r="7" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round" aria-hidden="true">
        <rect x="90" y="130" width="64" height="84" rx="6" />
        <line x1="98" y1="146" x2="146" y2="146" />
        <line x1="98" y1="158" x2="134" y2="158" />
        <line x1="98" y1="170" x2="146" y2="170" />
      </g>
      <Sparkle x={560} y={140} size={7} />
    </Frame>
  );
}

function EscritoriosVisual() {
  return (
    <Frame title="Escritórios e gestão — contexto de negócio">
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <rect x="170" y="150" width="170" height="108" rx="6" />
        <path d="M255 258 v26 h40" />
        <rect x="212" y="284" width="96" height="8" rx="4" />
        <path d="M120 330 h400" />
      </g>
      <g fill="none" stroke={ACCENT_DIM} strokeWidth="2" aria-hidden="true">
        <line x1="188" y1="176" x2="322" y2="176" />
        <line x1="188" y1="192" x2="322" y2="192" />
        <line x1="188" y1="208" x2="288" y2="208" />
      </g>
      <g stroke={LINE} strokeWidth="3" fill="none" strokeLinecap="round">
        <rect x="400" y="200" width="110" height="130" rx="8" />
        <line x1="414" y1="222" x2="496" y2="222" />
        <line x1="414" y1="240" x2="496" y2="240" />
        <line x1="414" y1="258" x2="470" y2="258" />
      </g>
      <g fill={ACCENT} stroke="none" aria-hidden="true">
        <rect x="196" y="286" width="14" height="44" rx="3" />
        <rect x="222" y="262" width="14" height="68" rx="3" opacity="0.75" />
        <rect x="248" y="242" width="14" height="88" rx="3" opacity="0.5" />
      </g>
      <g stroke={LINE_DIM} strokeWidth="2" fill="none" strokeLinecap="round" aria-hidden="true">
        <path d="M180 150 q-26 6 -34 -6" />
      </g>
      <Sparkle x={560} y={150} size={7} />
    </Frame>
  );
}

const visuals: Record<BusinessId, () => ReactNode> = {
  barbearias: BarbeariasVisual,
  restaurantes: RestaurantesVisual,
  hoteis: HoteisVisual,
  lojas: LojasVisual,
  terreno: TerrenoVisual,
  escritorios: EscritoriosVisual
};

export function BusinessVisual({ businessId }: { businessId: BusinessId }) {
  const Visual = visuals[businessId] ?? BarbeariasVisual;
  return <Visual />;
}

