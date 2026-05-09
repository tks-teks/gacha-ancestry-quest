import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Compass, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { Layout } from "@/components/Layout";
import { heritageObjects } from "@/data/heritageObjects";
import { toast } from "sonner";
import { ScrollReveal, StaggerReveal } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-fondation.jpg";
import caseObusMousgoumImage from "@/assets/case-obus-mousgoum.jpg";
import sculptureRecycleeImage from "@/assets/sculpture-recyclee.jpg";

const imageMap: Record<string, string> = {
  "case-obus-mousgoum": caseObusMousgoumImage,
  "sculpture-recyclee": sculptureRecycleeImage,
};

const Index = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    
    let objectId = result;
    
    if (result.includes("/objet/")) {
      const parts = result.split("/objet/");
      objectId = parts[parts.length - 1].replace(/\/$/, "");
    }
    
    const object = heritageObjects.find(obj => obj.id === objectId);
    
    if (object) {
      toast.success(`Objet trouvé: ${object.title}`);
      navigate(`/objet/${objectId}`);
    } else {
      toast.error("QR code non reconnu. Essayez un autre code.");
    }
  };

  return (
    <Layout>
      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner 
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Hero Section with enhanced parallax effect */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden -mt-14">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fondation Jean-Félicien Gacha - Bangoulap"
            className="w-full h-full object-cover animate-zoom-slow"
          />
        </div>
        
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        
        {/* Logo/Title Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-14">
          <div className="relative">
            {/* Glow effect behind title */}
            <div className="absolute inset-0 blur-3xl bg-primary/20 scale-150" />
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-foreground drop-shadow-2xl mb-3 animate-text-reveal tracking-wide">
              Fondation Jean-Félicien Gacha
            </h1>
          </div>
          <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <span className="w-8 h-px bg-primary-foreground/60" />
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 drop-shadow-lg font-light tracking-widest uppercase">
              Bangoulap, Grassfields
            </p>
            <span className="w-8 h-px bg-primary-foreground/60" />
          </div>
        </div>
      </div>

      {/* Welcome Section with floating card */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="px-4 py-8 -mt-20 relative z-10">
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-border/50 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full" />
            
            <div className="relative flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg animate-glow-pulse">
                <Compass className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                  Bienvenue, explorateur
                </h2>
                <p className="text-sm text-muted-foreground font-medium">
                  Centre des Cultures JLD
                </p>
              </div>
            </div>
            
            <p className="text-foreground/90 mb-6 leading-relaxed text-sm sm:text-base">
              Créée en 2002 par Ly Dumas pour honorer la mémoire de son père Jean-Félicien Gacha (1922-1972), 
              la Fondation préserve et transmet le patrimoine culturel des Grassfields. 
              <span className="text-primary font-medium"> Scannez les QR codes</span> pour dialoguer avec les esprits ancestraux.
            </p>
            
            {/* Enhanced action button */}
            <Button
              variant="scanner"
              size="xl"
              className="w-full group relative overflow-hidden"
              onClick={() => setShowScanner(true)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <QrCode className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Scanner un QR code
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Collection Preview with enhanced cards */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="px-4 pb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
            <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
              Collection Ly et Frédéric Dumas
            </h3>
          </div>
          
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.12}
            direction="up"
          >
            {heritageObjects.map((object, idx) => {
              const rarity =
                idx === 0 ? "rarity-legendary" : idx === 1 ? "rarity-rare" : "rarity-common";
              const rarityLabel =
                idx === 0 ? "Légendaire" : idx === 1 ? "Rare" : "Commun";
              return (
                <button
                  key={object.id}
                  onClick={() => navigate(`/objet/${object.id}`)}
                  className={`gacha-glow ${rarity} tilt-3d group relative w-full bg-card rounded-2xl shadow-lg overflow-hidden text-left active:scale-[0.98] transition-shadow duration-300 touch-target`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageMap[object.image]}
                      alt={object.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                    {/* Rarity badge */}
                    <span className="absolute top-2 right-2 z-10 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full glass-strong text-foreground border border-border/50 shadow-md">
                      <Sparkles className="inline w-3 h-3 mr-1 text-primary" />
                      {rarityLabel}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative p-4 sm:p-5">
                    <h4 className="font-serif font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {object.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                      {object.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">
                        Découvrir
                      </span>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </StaggerReveal>
        </div>
      </ScrollReveal>

      {/* Enhanced Footer */}
      <ScrollReveal direction="fade" delay={0.3}>
        <div className="px-4 pb-24 md:pb-8">
          <div className="relative py-8 border-t border-border/50">
            {/* Decorative element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
            
            <div className="text-center">
              <p className="text-sm font-medium text-foreground/80">
                © 2025 Fondation Jean-Félicien Gacha
              </p>
              <p className="text-xs text-muted-foreground mt-2 italic">
                « Susciter des vocations, développer les talents, transmettre les savoirs »
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
