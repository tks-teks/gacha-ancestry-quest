import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { heritageObjects } from "@/data/heritageObjects";

const QRCodes = () => {
  // Use the published URL so QR codes work with external scanner apps
  const PUBLISHED_URL = "https://gacha-ancestry-quest.lovable.app";
  
  const generateQRCodeUrl = (objectId: string) => {
    const objectUrl = `${PUBLISHED_URL}/objet/${objectId}`;
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
    <Layout>
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-xl font-serif font-bold">QR Codes</h1>
          <p className="text-sm text-primary-foreground/80">Collection Ly et Frédéric Dumas</p>
        </div>
        <Button onClick={handlePrint} variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </Button>
      </div>

      {/* Print header */}
      <div className="hidden print:block text-center py-6 border-b">
        <h1 className="text-2xl font-bold">Fondation Jean-Félicien Gacha</h1>
        <p className="text-sm text-muted-foreground">QR Codes - Collection Ly et Frédéric Dumas</p>
      </div>

      {/* QR Codes Grid */}
      <section className="px-4 py-6">
        <p className="text-sm text-muted-foreground mb-6 print:hidden animate-fade-in">
          Imprimez ces QR codes et placez-les près de chaque objet de la collection. 
          Les visiteurs pourront les scanner pour accéder aux fiches détaillées.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-8">
          {heritageObjects.map((object, index) => (
            <Card 
              key={object.id} 
              className="glass-card border-border/60 print:break-inside-avoid print:border-2 animate-fade-in hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6 flex flex-col items-center">
                <div className="rounded-xl bg-white p-2 mb-4 shadow-md">
                  <img
                    src={generateQRCodeUrl(object.id)}
                    alt={`QR Code pour ${object.title}`}
                    loading="lazy"
                    decoding="async"
                    className="w-32 h-32 sm:w-40 sm:h-40 block"
                  />
                </div>
                <h3 className="font-serif font-bold text-foreground text-center mb-1">
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
                  aria-label={`Télécharger le QR de ${object.title}`}
                  className="print:hidden"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>

                {/* Print-only URL */}
                <p className="hidden print:block text-xs text-muted-foreground mt-2 break-all">
                  https://gacha-ancestry-quest.lovable.app/objet/{object.id}
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
    </Layout>
  );
};

export default QRCodes;
