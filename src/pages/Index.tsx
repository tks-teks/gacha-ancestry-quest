import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Compass, ChevronRight, Lock, Check, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { Layout } from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { heritageObjects } from "@/data/heritageObjects";
import { useCollection, BADGE_INFO } from "@/hooks/useCollection";
import { toast } from "sonner";
import { ScrollReveal, StaggerReveal } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-fondation.jpg";
import caseObusMousgoumImage from "@/assets/case-obus-mousgoum.jpg";
import sculptureRecycleeImage from "@/assets/sculpture-recyclee.jpg";

const imageMap: Record<string, string> = {
  "case-obus-mousgoum": caseObusMousgoumImage,
  "sculpture-recyclee": sculptureRecycleeImage,
};

const RARITY = [
  { cls: "rarity-legendary", label: "Légendaire", symbol: "✦" },
  { cls: "rarity-rare", label: "Rare", symbol: "◆" },
  { cls: "rarity-common", label: "Commun", symbol: "●" },
];

const Index = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const { collection, registerScan } = useCollection(heritageObjects.length);

  // Handle deep-link ?action=scan (PWA shortcut)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "scan") {
      setShowScanner(true);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    let objectId = result;
    if (result.includes("/objet/")) {
      objectId = result.split("/objet/").pop()!.replace(/\/$/, "");
    }
    const object = heritageObjects.find(obj => obj.id === objectId);
    if (object) {
      const { newBadges } = registerScan();
      toast.success(`Objet trouvé : ${object.title}`);
      newBadges.forEach(b => {
        const info = BADGE_INFO[b];
        if (info) toast(`${info.emoji} Badge débloqué : ${info.label}`);
      });
      navigate(`/objet/${objectId}`);
    } else {
      toast.error("QR code non reconnu.");
    }
  };

  const total = heritageObjects.length;
  const discovered = collection.discovered.length;
  const progress = total ? Math.round((discovered / total) * 100) : 0;

  return (
    <Layout>
      {showScanner && <QRScanner onScan={handleScanResult} onClose={() => setShowScanner(false)} />}

      {/* Hero */}
      <div className="relative h-[55vh] md:h-[65vh] min-h-[480px] overflow-hidden -mt-14">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha - Bangoulap"
          className="absolute inset-0 w-full h-full object-cover animate-zoom-slow"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />

        {/* Shimmer badge */}
        <div className="absolute top-20 left-4 sm:left-8">
          <span className="badge-shimmer text-[10px] sm:text-xs font-mono-ui uppercase tracking-widest text-primary px-3 py-1.5 rounded-full border border-primary/40 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Patrimoine Vivant
          </span>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-14">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-primary/30 scale-150" />
            <h1 className="relative text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground drop-shadow-2xl mb-3 animate-text-reveal tracking-wider">
              Fondation Gacha
            </h1>
          </div>
          <p
            className="font-caslon italic text-base sm:text-lg text-foreground/80 mt-2 animate-fade-in max-w-md"
            style={{ animationDelay: '0.3s' }}
          >
            « Là où les ancêtres murmurent à travers la pierre et la terre »
          </p>
          <div className="flex items-center gap-2 mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="w-8 h-px bg-primary/60" />
            <p className="text-xs sm:text-sm text-primary font-mono-ui uppercase tracking-widest">
              Bangoulap • Grassfields
            </p>
            <span className="w-8 h-px bg-primary/60" />
          </div>

          <Button
            onClick={() => setShowScanner(true)}
            size="lg"
            className="mt-8 rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-2xl shadow-primary/40 animate-glow-pulse hover:scale-105 transition-transform"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scanner un QR code
          </Button>
        </div>
      </div>

      {/* Welcome Card */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="px-4 py-8 -mt-16 relative z-10">
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full" />
            <div className="relative flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg animate-glow-pulse">
                <Compass className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Bienvenue, explorateur</h2>
                <p className="text-sm text-muted-foreground font-mono-ui uppercase tracking-wider">Centre des Cultures JLD</p>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
              Créée en 2002 par Ly Dumas pour honorer la mémoire de son père Jean-Félicien Gacha (1922-1972),
              la Fondation préserve et transmet le patrimoine culturel des Grassfields.
              <span className="text-primary font-medium"> Scannez les QR codes</span> pour dialoguer avec les esprits ancestraux.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Collection progress */}
      {discovered > 0 && (
        <ScrollReveal direction="up" delay={0.15}>
          <div className="px-4 pb-4">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="font-serif font-bold text-foreground">Ma Collection</h3>
                </div>
                <span className="font-mono-ui text-sm text-primary">
                  {discovered} / {total}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              {collection.badges.length > 0 && (
                <Accordion type="single" collapsible className="mt-3">
                  <AccordionItem value="badges" className="border-0">
                    <AccordionTrigger className="text-xs py-2 hover:no-underline">
                      🏅 {collection.badges.length} badge{collection.badges.length > 1 ? "s" : ""} débloqué{collection.badges.length > 1 ? "s" : ""}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {collection.badges.map(b => {
                          const info = BADGE_INFO[b];
                          if (!info) return null;
                          return (
                            <div key={b} className="text-center p-2 rounded-lg bg-primary/10 border border-primary/20">
                              <div className="text-2xl">{info.emoji}</div>
                              <div className="text-[10px] font-mono-ui mt-1 text-foreground">{info.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Cards */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="px-4 pb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
            <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
              Collection Ly et Frédéric Dumas
            </h3>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.12}
            direction="up"
          >
            {heritageObjects.map((object, idx) => {
              const r = RARITY[Math.min(idx, RARITY.length - 1)];
              const isDiscovered = collection.discovered.includes(object.id);
              return (
                <button
                  key={object.id}
                  onClick={() => navigate(`/objet/${object.id}`)}
                  className={`gacha-glow ${r.cls} tilt-3d group relative w-full glass-card rounded-2xl shadow-lg overflow-hidden text-left active:scale-[0.98] transition-shadow duration-300 touch-target`}
                  aria-label={`${object.title} — ${r.label}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageMap[object.image]}
                      alt={object.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                    {/* Rarity badge */}
                    <span className="absolute top-2 right-2 z-10 text-[10px] font-mono-ui font-bold uppercase tracking-widest px-2.5 py-1 rounded-full glass-strong text-foreground border border-border/50 shadow-md inline-flex items-center gap-1">
                      <span className="text-primary">{r.symbol}</span>
                      {r.label}
                    </span>

                    {/* Discovery badge */}
                    <span className={`absolute top-2 left-2 z-10 text-[10px] font-mono-ui px-2 py-1 rounded-full inline-flex items-center gap-1 shadow-md ${
                      isDiscovered
                        ? "bg-accent/90 text-accent-foreground"
                        : "glass-strong text-muted-foreground border border-border/50"
                    }`}>
                      {isDiscovered ? <><Check className="w-3 h-3" /> Découvert</> : <><Lock className="w-3 h-3" /> À découvrir</>}
                    </span>
                  </div>

                  <div className="relative p-4 sm:p-5">
                    <h4 className="font-serif font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {object.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                      {object.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] font-mono-ui text-primary/80 uppercase tracking-widest">
                        {object.ancestorName}
                      </span>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted/50 group-hover:bg-primary/15 transition-all">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </StaggerReveal>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.3}>
        <div className="px-4 pb-28 md:pb-8">
          <div className="relative py-8 border-t border-border/50 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            <p className="text-sm font-medium text-foreground/80">© 2025 Fondation Jean-Félicien Gacha</p>
            <p className="text-xs text-muted-foreground mt-2 font-caslon italic">
              « Susciter des vocations, développer les talents, transmettre les savoirs »
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
