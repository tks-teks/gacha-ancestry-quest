import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed-at";
const DISMISS_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

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
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[60] animate-slide-in-bottom">
      <div className="glass-card rounded-2xl shadow-2xl border border-primary/30 p-4 flex items-center gap-3 relative overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none" />
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0 shadow-lg animate-glow-pulse">
          <Download className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0 relative">
          <p className="font-serif font-bold text-sm text-foreground leading-tight">
            Installer l'application
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Accès rapide depuis votre écran d'accueil
          </p>
        </div>
        <Button size="sm" onClick={install} className="relative shrink-0">
          Installer
        </Button>
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
