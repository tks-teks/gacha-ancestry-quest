import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@google/model-viewer";

interface Object3DViewerProps {
  modelUrl?: string;
  iosModelUrl?: string;
  posterUrl?: string;
  alt: string;
  showARButton?: boolean;
}

export const Object3DViewer = ({
  modelUrl,
  iosModelUrl,
  posterUrl,
  alt,
  showARButton = true,
}: Object3DViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const viewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Reset states when model changes
    setIsLoading(true);
    setHasError(false);
    setProgress(0);
  }, [modelUrl]);

  useEffect(() => {
    const el = viewerRef.current as any;
    if (!el) return;

    // React 18 doesn't reliably wire custom-element events through JSX props.
    // We attach DOM listeners directly to ensure the loader is dismissed.
    const onLoad = () => setIsLoading(false);
    const onError = () => {
      setIsLoading(false);
      setHasError(true);
    };
    const onProgress = (event: any) => {
      const p = typeof event?.detail?.totalProgress === "number" ? event.detail.totalProgress : 0;
      setProgress(p);
      if (p >= 1) setIsLoading(false);
    };

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    el.addEventListener("progress", onProgress);

    // If the model is already loaded when we attach listeners, dismiss immediately.
    if (el.loaded === true) setIsLoading(false);

    // Safety net: if something goes wrong and events never fire, stop infinite loading.
    const timeoutId = window.setTimeout(() => {
      if (el.loaded !== true) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 90000);

    return () => {
      window.clearTimeout(timeoutId);
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
      el.removeEventListener("progress", onProgress);
    };
  }, [modelUrl]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Fallback if no 3D model is available
  if (!modelUrl || hasError) {
    return (
      <div className="relative w-full h-64 sm:h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
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
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-500 ${
        isFullscreen
          ? "fixed inset-4 z-50 bg-background"
          : "w-full h-64 sm:h-80"
      }`}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Chargement du modèle 3D{progress > 0 ? ` • ${Math.round(progress * 100)}%` : "..."}
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>

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
        auto-rotate
        rotation-per-second="30deg"
        interaction-prompt="auto"
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        loading="eager"
        reveal="auto"
        camera-orbit="0deg 75deg 105%"
        min-camera-orbit="auto auto 50%"
        max-camera-orbit="auto auto 200%"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          "--poster-color": "transparent",
        } as React.CSSProperties}
      >
        {/* AR Button slot */}
        <button
          slot="ar-button"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg animate-glow-pulse flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          Voir en AR
        </button>
      </model-viewer>

      {/* Close fullscreen button */}
      {isFullscreen && (
        <Button
          variant="default"
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 z-20"
        >
          Fermer
        </Button>
      )}
    </div>
  );
};
