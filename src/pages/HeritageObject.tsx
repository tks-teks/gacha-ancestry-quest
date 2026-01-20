import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AncestorChat } from "@/components/AncestorChat";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Layout } from "@/components/Layout";
import { getHeritageObject } from "@/data/heritageObjects";
import tissuNdopImage from "@/assets/tissu-ndop.jpg";
import perlageRoyalImage from "@/assets/perlage-royal.jpg";
import masqueBamilekeImage from "@/assets/masque-bamileke.jpg";

const imageMap: Record<string, string> = {
  "tissu-ndop": tissuNdopImage,
  "perlage-royal": perlageRoyalImage,
  "masque-bamileke": masqueBamilekeImage,
};

const HeritageObject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const object = getHeritageObject(id || "");

  if (!object) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
              Objet non trouvé
            </h1>
            <Button onClick={() => navigate("/")} variant="default">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showHeader={false}>
      {/* Header Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={imageMap[object.image]}
          alt={object.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-background" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 -mt-8 relative z-10">
        <div className="bg-card rounded-xl shadow-lg p-5 sm:p-6 mb-6 border border-border animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
            {object.title}
          </h1>
          <p className="text-primary font-medium mb-4">{object.subtitle}</p>
          
          <AudioPlayer text={object.audioText} />
          
          <div className="mt-6">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              {object.description}
            </p>
          </div>
        </div>

        {/* Ancestor Chat */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <AncestorChat
            ancestorName={object.ancestorName}
            greeting={object.ancestorGreeting}
            objectContext={{
              title: object.title,
              subtitle: object.subtitle,
              description: object.description,
              audioText: object.audioText,
              ancestorName: object.ancestorName,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HeritageObject;
