import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Compass, ChevronRight, Info, Leaf, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { heritageObjects } from "@/data/heritageObjects";
import { toast } from "sonner";
import heroImage from "@/assets/hero-fondation.jpg";
import tissuNdopImage from "@/assets/tissu-ndop.jpg";
import perlageRoyalImage from "@/assets/perlage-royal.jpg";
import masqueBamilekeImage from "@/assets/masque-bamileke.jpg";

const imageMap: Record<string, string> = {
  "tissu-ndop": tissuNdopImage,
  "perlage-royal": perlageRoyalImage,
  "masque-bamileke": masqueBamilekeImage,
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
    <div className="min-h-screen bg-background">
      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner 
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha - Bangoulap"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground drop-shadow-lg mb-2">
            Fondation Jean-Félicien Gacha
          </h1>
          <p className="text-base text-primary-foreground/90 drop-shadow-md">
            Bangoulap, Grassfields - Cameroun
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-4 py-8 -mt-16 relative z-10">
        <div className="bg-card rounded-xl shadow-xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-foreground">
                Bienvenue, explorateur
              </h2>
              <p className="text-sm text-muted-foreground">
                Centre des Cultures JLD
              </p>
            </div>
          </div>
          
          <p className="text-foreground mb-6 leading-relaxed">
            Créée en 2002 par Ly Dumas pour honorer la mémoire de son père Jean-Félicien Gacha (1922-1972), 
            la Fondation préserve et transmet le patrimoine culturel des Grassfields. 
            Scannez les QR codes pour dialoguer avec les esprits ancestraux.
          </p>
          
          <Button
            variant="scanner"
            size="xl"
            className="w-full"
            onClick={() => setShowScanner(true)}
          >
            <QrCode className="w-6 h-6 mr-2" />
            Scanner un QR Code
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate("/a-propos")}
            className="bg-card rounded-xl p-4 border border-border shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">À propos</span>
          </button>
          
          <button
            onClick={() => navigate("/jardin-botanique")}
            className="bg-card rounded-xl p-4 border border-border shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Jardin</span>
          </button>
          
          <button
            onClick={() => navigate("/qr-codes")}
            className="bg-card rounded-xl p-4 border border-border shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">QR Codes</span>
          </button>
        </div>
      </div>

      {/* Collection Preview */}
      <div className="px-4 pb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Collection Ly et Frédéric Dumas
        </h3>
        
        <div className="space-y-4">
          {heritageObjects.map((object) => (
            <button
              key={object.id}
              onClick={() => navigate(`/objet/${object.id}`)}
              className="w-full bg-card rounded-xl shadow-md border border-border overflow-hidden flex items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-24 h-24 shrink-0">
                <img
                  src={imageMap[object.image]}
                  alt={object.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4 text-left">
                <h4 className="font-serif font-bold text-foreground">
                  {object.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {object.subtitle}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground mr-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8">
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 Fondation Jean-Félicien Gacha
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Susciter des vocations, développer les talents, transmettre les savoirs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
