import { useCallback, useEffect, useState } from "react";

const KEY = "fg-collection-v1";

export interface Collection {
  discovered: string[];
  scanCount: number;
  badges: string[];
  lastVisit: string;
}

const DEFAULT: Collection = {
  discovered: [],
  scanCount: 0,
  badges: [],
  lastVisit: new Date().toISOString(),
};

const read = (): Collection => {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
};

const write = (c: Collection) => {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
};

type DiscoverResult = { isNew: boolean; newBadges: string[] };

export const useCollection = (totalObjects: number) => {
  const [collection, setCollection] = useState<Collection>(read);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setCollection(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const discover = useCallback((id: string): DiscoverResult => {
    const current = read();
    const isNew = !current.discovered.includes(id);
    if (!isNew) return { isNew: false, newBadges: [] };

    const newBadges: string[] = [];
    const next: Collection = {
      ...current,
      discovered: [...current.discovered, id],
      lastVisit: new Date().toISOString(),
      badges: [...current.badges],
    };
    if (next.discovered.length === 1 && !next.badges.includes("first-step")) {
      next.badges.push("first-step"); newBadges.push("first-step");
    }
    if (totalObjects > 0 && next.discovered.length >= totalObjects && !next.badges.includes("explorer")) {
      next.badges.push("explorer"); newBadges.push("explorer");
    }
    write(next);
    setCollection(next);
    return { isNew: true, newBadges };
  }, [totalObjects]);

  const registerScan = useCallback(() => {
    const current = read();
    const newBadges: string[] = [];
    const next: Collection = {
      ...current,
      scanCount: current.scanCount + 1,
      badges: [...current.badges],
    };
    if (next.scanCount === 1 && !next.badges.includes("digital")) {
      next.badges.push("digital"); newBadges.push("digital");
    }
    write(next);
    setCollection(next);
    return { newBadges };
  }, []);

  return { collection, discover, registerScan };
};

export const BADGE_INFO: Record<string, { emoji: string; label: string; description: string }> = {
  "first-step": { emoji: "🏺", label: "Premier Pas", description: "Votre première découverte" },
  "explorer": { emoji: "🔍", label: "Explorateur", description: "Tous les objets découverts" },
  "digital": { emoji: "📱", label: "Numérique", description: "Premier scan QR réussi" },
};
