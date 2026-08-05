"use client";

import { useEffect, useSyncExternalStore } from 'react';

// Motion budget global para autoplay: apenas um componente pode mover automaticamente por vez.
// O dono é o componente elegível com maior prioridade (mais visível e central no viewport).
// Um candidato só assume a posse quando ultrapassa a prioridade do dono atual por uma margem
// clara, evitando alternâncias constantes durante o scroll.
type MotionRequest = {
  priority: number;
  sequence: number;
};

let activeMotionId: string | null = null;
let sequenceSeed = 0;
const requests = new Map<string, MotionRequest>();
const subscribers = new Set<() => void>();

const PREEMPTION_MARGIN = 0.03;

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

function highestPriorityRequest() {
  let bestId: string | null = null;
  let bestPriority = Number.NEGATIVE_INFINITY;
  let bestSequence = Number.NEGATIVE_INFINITY;

  requests.forEach((request, id) => {
    if (request.priority > bestPriority || (request.priority === bestPriority && request.sequence > bestSequence)) {
      bestId = id;
      bestPriority = request.priority;
      bestSequence = request.sequence;
    }
  });

  return bestId;
}

function recomputeOwner() {
  const current = activeMotionId;

  if (current && requests.has(current)) {
    const currentPriority = requests.get(current)!.priority;
    let challenger: string | null = null;
    let challengerPriority = Number.NEGATIVE_INFINITY;

    requests.forEach((request, id) => {
      if (id === current) {
        return;
      }
      if (request.priority - currentPriority > PREEMPTION_MARGIN && request.priority > challengerPriority) {
        challenger = id;
        challengerPriority = request.priority;
      }
    });

    if (challenger !== null) {
      activeMotionId = challenger;
      notifySubscribers();
    }
    return;
  }

  const next = highestPriorityRequest();
  if (next !== activeMotionId) {
    activeMotionId = next;
    notifySubscribers();
  }
}

function setMotionRequest(id: string, priority: number) {
  const existing = requests.get(id);
  if (existing && existing.priority === priority) {
    return;
  }

  requests.set(id, { priority, sequence: ++sequenceSeed });
  recomputeOwner();
}

function clearMotionRequest(id: string) {
  if (requests.delete(id)) {
    recomputeOwner();
  }
}

export function useMotionBudget(id: string, requested: boolean, priority = 0) {
  const ownerId = useSyncExternalStore(subscribe, () => activeMotionId, () => null);
  const isOwner = ownerId === id;

  useEffect(() => {
    if (!requested) {
      clearMotionRequest(id);
      return;
    }

    setMotionRequest(id, priority);
  }, [id, priority, requested]);

  // Cleanup garante libertação em unmount (incluindo re-mounts do Strict Mode em desenvolvimento).
  useEffect(
    () => () => {
      clearMotionRequest(id);
    },
    [id]
  );

  return isOwner;
}
