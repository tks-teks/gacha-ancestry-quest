import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Compass, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { heritageObjects } from "@/data/heritageObjects";
import { toast } from "sonner";
import heroImage from "@/assets/hero-fondation.jpg";
import masqueImage from "@/assets/masque-ancestral.jpg";
import poterieImage from "@/assets/poterie-traditionnelle.jpg";

const imageMap: Record<string, string> = {
  "masque-ancestral": masqueImage,
  "poterie-traditionnelle": poterieImage,
};

const Index = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    
    // Check if the result is a full URL or just an ID
    let objectId = result;
    
    // Handle full URLs like https://domain.com/objet/masque-ancestral
    if (result.includes("/objet/")) {
      const parts = result.split("/objet/");
      objectId = parts[parts.length - 1].replace(/\/$/, ""); // Remove trailing slash
    }
    
    // Check if the object exists
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
          alt="Fondation Gacha"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background" />
        
        {/* Logo/Title Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground drop-shadow-lg mb-2">
            Fondation Gacha
          </h1>
          <p className="text-lg text-primary-foreground/90 drop-shadow-md">
            Gardiens du patrimoine
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
                Découvrez notre patrimoine
              </p>
            </div>
          </div>
          
          <p className="text-foreground mb-6 leading-relaxed">
            Plongez dans l'histoire vivante de notre héritage culturel. 
            Scannez les QR codes près des objets pour découvrir leurs secrets 
            et dialoguer avec les esprits ancestraux.
          </p>
          
          {/* QR Scanner Button */}
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

      {/* Collection Preview */}
      <div className="px-4 pb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Explorer la collection
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
            © 2025 Fondation Gacha
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Préserver le passé, inspirer l'avenir
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
