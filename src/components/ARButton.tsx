import { useState, useEffect } from "react";
import { Smartphone, Camera, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ARButtonProps {
  onActivate?: () => void;
  isSupported?: boolean;
}

export const ARButton = ({ onActivate, isSupported = true }: ARButtonProps) => {
  const [isARAvailable, setIsARAvailable] = useState(true);

  useEffect(() => {
    // Check for AR support
    const checkARSupport = async () => {
      try {
        // Check for WebXR AR support
        if ("xr" in navigator) {
          const xr = (navigator as any).xr;
          if (xr) {
            const supported = await xr.isSessionSupported("immersive-ar");
            setIsARAvailable(supported);
            return;
          }
        }
        // Fallback: Check for model-viewer AR availability (Scene Viewer / Quick Look)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        setIsARAvailable(isIOS || isAndroid);
      } catch {
        setIsARAvailable(false);
      }
    };

    checkARSupport();
  }, []);

  if (!isSupported || !isARAvailable) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              disabled
              className="w-full py-6 border-dashed opacity-60"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Réalité augmentée non disponible
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-sm">
              L'AR nécessite un appareil mobile compatible (iPhone/iPad ou
              Android récent)
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl animate-glow-pulse" />

      <Button
        onClick={onActivate}
        className="relative w-full py-6 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-shimmer" />

        <div className="relative flex items-center justify-center gap-3">
          <div className="relative">
            <Smartphone className="w-6 h-6" />
            <Camera className="w-3 h-3 absolute -bottom-1 -right-1 bg-primary-foreground text-primary rounded-full p-0.5" />
          </div>
          <span className="text-lg">Voir en réalité augmentée</span>
        </div>
      </Button>

      <p className="text-center text-xs text-muted-foreground mt-2">
        Pointez votre appareil pour voir l'objet dans votre espace
      </p>
    </div>
  );
};
