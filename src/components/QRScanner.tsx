import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X, Camera, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export const QRScanner = ({ onScan, onClose }: QRScannerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        };

        await scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            if (mounted) {
              onScan(decodedText);
            }
          },
          () => {
            // QR code not detected - this is normal, ignore
          }
        );

        isRunningRef.current = true;

        if (mounted) {
          setIsStarting(false);
        }
      } catch (err) {
        console.error("Scanner error:", err);
        isRunningRef.current = false;
        if (mounted) {
          setIsStarting(false);
          if (err instanceof Error) {
            if (err.message.includes("Permission")) {
              setError("Accès à la caméra refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.");
            } else if (err.message.includes("NotFound") || err.message.includes("not found")) {
              setError("Aucune caméra détectée sur cet appareil.");
            } else {
              setError("Impossible de démarrer la caméra. Essayez de recharger la page.");
            }
          } else {
            setError("Erreur lors de l'accès à la caméra.");
          }
        }
      }
    };

    startScanner();

    return () => {
      mounted = false;
      if (scannerRef.current && isRunningRef.current) {
        scannerRef.current.stop().then(() => {
          isRunningRef.current = false;
        }).catch(() => {
          // Ignore stop errors
        });
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-foreground">Scanner QR Code</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scanner Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {isStarting && !error && (
            <div className="text-center mb-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Démarrage de la caméra...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-6 bg-destructive/10 rounded-xl border border-destructive/20 max-w-sm">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <p className="text-foreground mb-4">{error}</p>
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
            </div>
          )}

          <div 
            ref={containerRef}
            className={`w-full max-w-sm ${error ? "hidden" : ""}`}
          >
            <div 
              id="qr-reader" 
              className="rounded-xl overflow-hidden"
            />
          </div>

          {!error && !isStarting && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Placez le QR code dans le cadre
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Le scan est automatique
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 border-t border-border bg-card">
          <p className="text-sm text-muted-foreground text-center">
            Scannez le QR code près d'un objet du patrimoine pour découvrir son histoire
          </p>
        </div>
      </div>
    </div>
  );
};
