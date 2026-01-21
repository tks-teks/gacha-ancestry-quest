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
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadProgressPct, setLoadProgressPct] = useState<number | null>(null);

  useEffect(() => {
    // NOTE: <model-viewer> is a Web Component; React's onLoad/onError are not
    // reliably fired for custom elements. We attach DOM event listeners directly.
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

    // Extra safety: some browsers/dev builds may render the model but never
    // dispatch the custom-element 'load' event. If we detect the model is
    // available, we stop the loading UI.
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
              Chargement du modèle 3D{typeof loadProgressPct === "number" ? `… ${loadProgressPct}%` : "…"}
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
