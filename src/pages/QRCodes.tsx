import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { heritageObjects } from "@/data/heritageObjects";

const QRCodes = () => {
  const navigate = useNavigate();
  const baseUrl = window.location.origin;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-4 print:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-serif font-bold text-foreground">
            QR Codes
          </h1>
          <p className="text-sm text-muted-foreground">
            Codes imprimables pour la collection
          </p>
        </div>
        <Button onClick={handlePrint} variant="default">
          <Printer className="w-4 h-4 mr-2" />
          Imprimer
        </Button>
      </div>

      {/* Print Header */}
      <div className="hidden print:block text-center py-8">
        <h1 className="text-2xl font-serif font-bold">
          Fondation Jean-Félicien Gacha
        </h1>
        <p className="text-muted-foreground">QR Codes - Collection Patrimoniale</p>
      </div>

      {/* QR Codes Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-8">
        {heritageObjects.map((object) => {
          const objectUrl = `${baseUrl}/objet/${object.id}`;
          
          return (
            <div
              key={object.id}
              className="bg-card rounded-xl p-6 border border-border shadow-md flex flex-col items-center print:shadow-none print:border-2 print:border-foreground/20"
            >
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCodeSVG
                  value={objectUrl}
                  size={160}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <h3 className="text-lg font-serif font-bold text-foreground text-center mb-1">
                {object.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-3">
                {object.subtitle}
              </p>
              
              <p className="text-xs text-muted-foreground text-center break-all print:hidden">
                {objectUrl}
              </p>
              
              <div className="mt-4 text-center print:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/objet/${object.id}`)}
                >
                  Voir l'objet
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Print Footer */}
      <div className="hidden print:block text-center py-8 border-t">
        <p className="text-sm text-muted-foreground">
          Scannez ces codes avec votre téléphone pour accéder aux fiches détaillées
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © 2025 Fondation Jean-Félicien Gacha - Bangoulap, Cameroun
        </p>
      </div>
    </div>
  );
};

export default QRCodes;
