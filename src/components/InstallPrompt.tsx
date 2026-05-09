import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed-at";
const DISMISS_TTL = 1000 * 60 * 60 * 24 * 7;

export const InstallPrompt = () => {
  const [event, setEvent] = useState<BIPEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_TTL) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BIPEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    dismiss();
  };

  if (!visible || !event) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[60] animate-slide-in-bottom">
      <div className="glass-strong rounded-2xl shadow-2xl border border-primary/40 p-4 flex items-center gap-3 relative overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-secondary/15 pointer-events-none" />
        <div className="text-3xl shrink-0 relative animate-float">🏺</div>
        <div className="flex-1 min-w-0 relative">
          <p className="font-serif font-bold text-sm text-foreground tracking-wide">
            Installer l'app
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Accès rapide + expérience AR optimale
          </p>
        </div>
        <div className="flex flex-col gap-1.5 relative shrink-0">
          <Button size="sm" onClick={install} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Installer
          </Button>
          <Button size="sm" variant="ghost" onClick={dismiss} className="text-xs h-7">
            Plus tard
          </Button>
        </div>
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full hover:bg-muted/60 flex items-center justify-center text-muted-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
