import { Link } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { heritageObjects } from "@/data/heritageObjects";

const QRCodes = () => {
  const generateQRCodeUrl = (objectId: string) => {
    const baseUrl = window.location.origin;
    const objectUrl = `${baseUrl}/objet/${objectId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(objectUrl)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (objectId: string, title: string) => {
    const qrUrl = generateQRCodeUrl(objectId);
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${objectId}-${title.replace(/\s+/g, "-").toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - hidden when printing */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border print:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">QR Codes</h1>
          </div>
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer tout
          </Button>
        </div>
      </header>

      {/* Print header */}
      <div className="hidden print:block text-center py-6 border-b">
        <h1 className="text-2xl font-bold">Fondation Jean-Félicien Gacha</h1>
        <p className="text-sm text-muted-foreground">QR Codes - Collection Ly et Frédéric Dumas</p>
      </div>

      {/* QR Codes Grid */}
      <section className="container mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-6 print:hidden">
          Imprimez ces QR codes et placez-les près de chaque objet de la collection. 
          Les visiteurs pourront les scanner pour accéder aux fiches détaillées.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-8">
          {heritageObjects.map((object) => (
            <Card key={object.id} className="bg-card border-border print:break-inside-avoid print:border-2">
              <CardContent className="p-6 flex flex-col items-center">
                <img
                  src={generateQRCodeUrl(object.id)}
                  alt={`QR Code pour ${object.title}`}
                  className="w-40 h-40 mb-4"
                />
                <h3 className="font-semibold text-foreground text-center mb-1">
                  {object.title}
                </h3>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  {object.subtitle}
                </p>
                
                {/* Download button - hidden when printing */}
                <Button
                  onClick={() => handleDownload(object.id, object.title)}
                  variant="outline"
                  size="sm"
                  className="print:hidden"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>

                {/* Print-only URL */}
                <p className="hidden print:block text-xs text-muted-foreground mt-2 break-all">
                  {window.location.origin}/objet/{object.id}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default QRCodes;
