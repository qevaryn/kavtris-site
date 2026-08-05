"use client";

import { useEffect, useSyncExternalStore } from 'react';

// Motion budget global para autoplay: apenas um componente pode mover automaticamente por vez.
// Regra intencional: o primeiro componente elegível mantém a posse enquanto continuar elegível.
// Outro componente só assume quando o dono atual deixa de ser elegível (ex.: sai do viewport,
// para de solicitar movimento, entra em reduced motion ou é desmontado).
let activeMotionId: string | null = null;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

function acquireMotion(id: string) {
  if (activeMotionId === null || activeMotionId === id) {
    activeMotionId = id;
    notifySubscribers();
    return true;
  }

  return false;
}

function releaseMotion(id: string) {
  if (activeMotionId === id) {
    activeMotionId = null;
    notifySubscribers();
  }
}

export function useMotionBudget(id: string, requested: boolean) {
  const ownerId = useSyncExternalStore(subscribe, () => activeMotionId, () => null);
  const isOwner = ownerId === id;

  useEffect(() => {
    // Ao deixar de pedir movimento, o dono atual liberta imediatamente a posse.
    if (!requested) {
      releaseMotion(id);
      return;
    }

    // Sem preempção: só adquire se não houver dono ou se já for o dono atual.
    if (ownerId === null || ownerId === id) {
      acquireMotion(id);
    }
  }, [id, ownerId, requested]);

  // Cleanup garante libertação em unmount (incluindo re-mounts do Strict Mode em desenvolvimento).
  useEffect(
    () => () => {
      releaseMotion(id);
    },
    [id]
  );

  return isOwner;
}