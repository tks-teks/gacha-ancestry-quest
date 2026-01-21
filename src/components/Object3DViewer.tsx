import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Maximize2, Minimize2, Info, X, Move3d, Smartphone, Hand, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Annotation3D } from "@/data/annotations3D";
import "@google/model-viewer";

interface Object3DViewerProps {
  modelUrl?: string;
  iosModelUrl?: string;
  posterUrl?: string;
  alt: string;
  showARButton?: boolean;
  annotations?: Annotation3D[];
}

export const Object3DViewer = ({
  modelUrl,
  iosModelUrl,
  posterUrl,
  alt,
  showARButton = true,
  annotations = [],
}: Object3DViewerProps) => {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadProgressPct, setLoadProgressPct] = useState<number | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation3D | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showARGuide, setShowARGuide] = useState(false);
  const [showTouchHint, setShowTouchHint] = useState(true);

  useEffect(() => {
    const el = viewerRef.current as any;
    if (!el || !modelUrl) return;

    setIsLoading(true);
    setHasError(false);
    setLoadProgressPct(0);

    const safetyTimeoutMs = 90_000;
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
      setLoadProgressPct(null);
    }, safetyTimeoutMs);

    const onLoad = () => {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
      setHasError(false);
      setLoadProgressPct(null);
    };

    const onError = () => {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
      setHasError(true);
      setLoadProgressPct(null);
    };

    const onProgress = (event: any) => {
      const totalProgress = event?.detail?.totalProgress;
      if (typeof totalProgress === "number") {
        const pct = Math.max(0, Math.min(100, Math.round(totalProgress * 100)));
        setLoadProgressPct(pct);
      }
    };

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    el.addEventListener("progress", onProgress);

    const pollId = window.setInterval(() => {
      const current = viewerRef.current as any;
      if (!current) return;
      if (current.loaded === true || current.model) {
        onLoad();
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(pollId);
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
      el.removeEventListener("progress", onProgress);
    };
  }, [modelUrl]);

  // Hide touch hint after first interaction
  useEffect(() => {
    if (!isLoading && showTouchHint) {
      const timer = setTimeout(() => setShowTouchHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showTouchHint]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleARClick = () => {
    setShowARGuide(true);
  };

  // Fallback if no 3D model is available
  if (!modelUrl || hasError) {
    return (
      <div className="relative w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-float">
            <RotateCcw className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Modèle 3D bientôt disponible
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* AR Guide Modal */}
      {showARGuide && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-border relative">
            <button
              onClick={() => setShowARGuide(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-glow-pulse">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                Expérience Réalité Augmentée
              </h3>
              <p className="text-sm text-muted-foreground">
                Projetez cet objet dans votre espace réel
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Pointez votre caméra</p>
                  <p className="text-xs text-muted-foreground">Vers une surface plane bien éclairée</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Déplacez lentement</p>
                  <p className="text-xs text-muted-foreground">Pour que l'appareil détecte le sol</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Placez l'objet</p>
                  <p className="text-xs text-muted-foreground">Touchez l'écran pour positionner</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setShowARGuide(false);
                // Trigger the AR button in model-viewer
                const arButton = viewerRef.current?.shadowRoot?.querySelector('[slot="ar-button"]') as HTMLElement;
                if (arButton) arButton.click();
              }}
              className="w-full py-4 text-base font-semibold"
              size="lg"
            >
              <Move3d className="w-5 h-5 mr-2" />
              Lancer l'expérience AR
            </Button>
          </div>
        </div>
      )}

      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-500 touch-manipulation ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-background rounded-none"
            : "w-full h-72 sm:h-80 md:h-96"
        }`}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-card/90 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center px-4">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-muted" />
                <div 
                  className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                  style={{
                    clipPath: loadProgressPct !== null 
                      ? `polygon(0 0, 100% 0, 100% ${loadProgressPct}%, 0 ${loadProgressPct}%)`
                      : undefined
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Move3d className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                Chargement du modèle 3D
              </p>
              {typeof loadProgressPct === "number" && (
                <p className="text-xs text-muted-foreground">{loadProgressPct}%</p>
              )}
            </div>
          </div>
        )}

        {/* Touch interaction hint */}
        {!isLoading && showTouchHint && !isFullscreen && (
          <div className="absolute inset-0 pointer-events-none z-5 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 animate-fade-in">
              <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Hand className="w-4 h-4" />
                  <span className="text-xs">Glisser</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ZoomIn className="w-4 h-4" />
                  <span className="text-xs">Pincer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {annotations.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`w-10 h-10 bg-card/90 backdrop-blur-sm shadow-md border border-border/50 ${
                showAnnotations ? "text-primary" : "text-muted-foreground"
              }`}
              title={showAnnotations ? "Masquer annotations" : "Afficher annotations"}
            >
              <Info className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="w-10 h-10 bg-card/90 backdrop-blur-sm shadow-md border border-border/50"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Active annotation popup */}
        {activeAnnotation && (
          <div className="absolute bottom-20 left-3 right-3 sm:left-4 sm:right-4 z-30 bg-card/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border animate-slide-up">
            <button
              onClick={() => setActiveAnnotation(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-serif font-bold text-foreground text-base mb-2 pr-8">
              {activeAnnotation.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeAnnotation.description}
            </p>
          </div>
        )}

        {/* 3D Model Viewer */}
        <model-viewer
          ref={viewerRef as any}
          src={modelUrl}
          ios-src={iosModelUrl}
          poster={posterUrl}
          alt={alt}
          ar={showARButton}
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          rotation-per-second="25deg"
          interaction-prompt="none"
          shadow-intensity="1.2"
          shadow-softness="0.8"
          exposure="1.1"
          loading="eager"
          reveal="auto"
          camera-orbit="0deg 75deg 105%"
          min-camera-orbit="auto auto 60%"
          max-camera-orbit="auto auto 180%"
          interpolation-decay="100"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            "--poster-color": "transparent",
            touchAction: "pan-y",
          } as React.CSSProperties}
        >
          {/* Annotation hotspots */}
          {showAnnotations &&
            annotations.map((annotation) => (
              <button
                key={annotation.id}
                className="Hotspot"
                slot={`hotspot-${annotation.id}`}
                data-position={annotation.position}
                data-normal={annotation.normal}
                data-visibility-attribute="visible"
                onClick={() => setActiveAnnotation(annotation)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "3px solid hsl(var(--primary-foreground))",
                  backgroundColor: "hsl(var(--primary))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px hsl(var(--primary) / 0.3)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onPointerDown={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1.2)";
                  (e.target as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.4), 0 0 0 6px hsl(var(--primary) / 0.4)";
                }}
                onPointerUp={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1)";
                  (e.target as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px hsl(var(--primary) / 0.3)";
                }}
                onPointerLeave={(e) => {
                  (e.target as HTMLElement).style.transform = "scale(1)";
                  (e.target as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px hsl(var(--primary) / 0.3)";
                }}
              >
                <span
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    fontSize: "16px",
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  ?
                </span>
              </button>
            ))}

          {/* Enhanced AR Button slot */}
          <button
            slot="ar-button"
            onClick={handleARClick}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-3.5 sm:px-6 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-xl flex items-center gap-2.5 hover:bg-primary/90 active:scale-95 transition-all touch-manipulation"
            style={{
              boxShadow: "0 4px 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)",
            }}
          >
            <Move3d className="w-5 h-5" />
            <span className="text-sm sm:text-base">Voir en AR</span>
          </button>
        </model-viewer>

        {/* Close fullscreen button */}
        {isFullscreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            <Button
              variant="outline"
              onClick={toggleFullscreen}
              className="px-6 py-3 bg-card/90 backdrop-blur-sm shadow-lg"
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Fermer
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
