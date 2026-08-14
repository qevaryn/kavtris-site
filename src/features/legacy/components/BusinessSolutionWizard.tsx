"use client";

import { useMemo, useState } from 'react';
import { Button } from '@/components/shared/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';

const goals = [
  ['team', 'Organização da equipa'],
  ['service', 'Atendimento ao cliente'],
  ['orders', 'Gestão de pedidos'],
  ['booking', 'Reservas e marcações'],
  ['sales', 'Vendas'],
  ['communication', 'Comunicação entre setores'],
  ['manual', 'Tarefas repetitivas'],
  ['unknown', 'Ainda não sei']
] as const;

const goalCopy: Record<string, { title: string; text: string; format: string }> = {
  team: {
    title: 'Sistema online para organizar equipas e tarefas',
    text: 'Uma área de gestão para distribuir tarefas, acompanhar prazos e manter todos informados.',
    format: 'Sistema web + painel de gestão'
  },
  service: {
    title: 'Área de atendimento e acompanhamento',
    text: 'Um sistema para registar pedidos, responder clientes e acompanhar cada atendimento.',
    format: 'Portal web com histórico'
  },
  orders: {
    title: 'Sistema de gestão de pedidos',
    text: 'Pedidos centralizados com responsável, prazo, estado e histórico.',
    format: 'Web + telemóvel'
  },
  booking: {
    title: 'Plataforma de reservas e marcações',
    text: 'Agenda online para clientes e painel de gestão para a equipa.',
    format: 'Agenda web responsiva'
  },
  sales: {
    title: 'Sistema de acompanhamento comercial',
    text: 'Contactos, oportunidades, propostas e próximos passos organizados.',
    format: 'CRM personalizado'
  },
  communication: {
    title: 'Fluxo de comunicação entre setores',
    text: 'A informação passa automaticamente para o setor certo, com estado e responsabilidade.',
    format: 'Workflow interno'
  },
  manual: {
    title: 'Automação de tarefas repetitivas',
    text: 'O sistema valida, avisa, atualiza e cria relatórios automaticamente.',
    format: 'Automação + integração'
  },
  unknown: {
    title: 'Descoberta e protótipo inicial',
    text: 'Primeiro entendemos o processo e depois apresentamos uma solução simples para validar.',
    format: 'Levantamento + protótipo'
  }
};

export function BusinessSolutionWizard() {
  const [goal, setGoal] = useState('team');
  const [users, setUsers] = useState('all');
  const [place, setPlace] = useState('multiple');
  const [clientNeeds, setClientNeeds] = useState('orders');

  const suggestion = useMemo(() => {
    const base = goalCopy[goal] ?? goalCopy.team;
    const needsMobile = users === 'clients' || users === 'all' || place === 'outside' || place === 'multiple';
    const clientLayer = clientNeeds !== 'none';

    return {
      ...base,
      format: needsMobile ? `${base.format} com experiência mobile` : base.format,
      firstStep: goal === 'unknown' ? 'Mapeamento simples' : 'Protótipo navegável',
      strategy: clientLayer ? 'Área interna + acompanhamento do cliente' : 'Área interna por fases'
    };
  }, [goal, users, place, clientNeeds]);

  return (
    <section id="simulador" className="soft-section-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Descobrir solução"
          title="Responda sobre o negócio. Nós traduzimos para tecnologia."
          subtitle="Não começamos por perguntar APIs ou arquitetura. Primeiro entendemos o que pretende melhorar."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.6rem] border border-borderline bg-white p-5 shadow-sm sm:p-6">
            <fieldset>
              <legend className="text-lg font-bold text-navy-900">O que pretende melhorar?</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {goals.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={goal === value}
                    onClick={() => setGoal(value)}
                    className={`min-h-12 rounded-2xl border px-4 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue ${
                      goal === value ? 'border-navy-900 bg-navy-900 text-white' : 'border-borderline bg-paper text-navy-800 hover:border-kavtris-blue'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="text-sm font-semibold text-navy-800">
                Quem utilizaria?
                <select value={users} onChange={(event) => setUsers(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-3 text-sm">
                  <option value="management">Só a gestão</option>
                  <option value="staff">Funcionários</option>
                  <option value="clients">Clientes</option>
                  <option value="all">Todos</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-navy-800">
                Onde a equipa trabalha?
                <select value={place} onChange={(event) => setPlace(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-3 text-sm">
                  <option value="office">No escritório</option>
                  <option value="stores">Em lojas</option>
                  <option value="outside">Fora da empresa</option>
                  <option value="multiple">Em diferentes locais</option>
                  <option value="unknown">Ainda não sei</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-navy-800">
                O cliente precisa acompanhar?
                <select value={clientNeeds} onChange={(event) => setClientNeeds(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-3 text-sm">
                  <option value="orders">Pedidos</option>
                  <option value="booking">Reservas</option>
                  <option value="documents">Documentos</option>
                  <option value="payments">Pagamentos</option>
                  <option value="services">Serviços</option>
                  <option value="none">Não</option>
                </select>
              </label>
            </div>
          </div>

          <aside className="rounded-[1.6rem] border border-navy-900/15 bg-navy-950 p-6 text-white shadow-card sm:p-8" aria-live="polite">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-kavtris-blueLight">Solução sugerida</p>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight">{suggestion.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/72">{suggestion.text}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Result label="Formato sugerido" value={suggestion.format} />
              <Result label="Primeira etapa" value={suggestion.firstStep} />
              <Result label="Estratégia" value={suggestion.strategy} />
              <Result label="Acompanhamento" value="Sujeito a levantamento" />
            </div>
            <p className="mt-5 text-sm leading-7 text-white/60">
              Esta é uma estimativa inicial e serve apenas como ponto de partida. A proposta real depende do levantamento.
            </p>
            <div className="mt-6">
              <Button href="#contacto" className="text-navy-950">
                Enviar explicação
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
