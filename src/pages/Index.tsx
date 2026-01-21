import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Compass, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/QRScanner";
import { Layout } from "@/components/Layout";
import { heritageObjects } from "@/data/heritageObjects";
import { toast } from "sonner";
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

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden -mt-14">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha - Bangoulap"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-background" />
        
        {/* Logo/Title Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary-foreground drop-shadow-lg mb-2 animate-fade-in">
            Fondation Jean-Félicien Gacha
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/90 drop-shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
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
          
          {/* Action button */}
          <Button
            variant="scanner"
            size="xl"
            className="w-full"
            onClick={() => setShowScanner(true)}
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scanner un QR code
          </Button>
        </div>
      </div>


      {/* Collection Preview */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Collection Ly et Frédéric Dumas
        </h3>
        
        <div className="space-y-3">
          {heritageObjects.map((object, index) => (
            <button
              key={object.id}
              onClick={() => navigate(`/objet/${object.id}`)}
              className="w-full bg-card rounded-xl shadow-md border border-border overflow-hidden flex items-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group active:scale-[0.98]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden">
                <img
                  src={imageMap[object.image]}
                  alt={object.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-3 sm:p-4 text-left">
                <h4 className="font-serif font-bold text-foreground text-sm sm:text-base">
                  {object.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                  {object.subtitle}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground mr-3 sm:mr-4 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6">
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 Fondation Jean-Félicien Gacha
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Susciter des vocations, développer les talents, transmettre les savoirs
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
