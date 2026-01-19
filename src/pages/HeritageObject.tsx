import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AncestorChat } from "@/components/AncestorChat";
import { AudioPlayer } from "@/components/AudioPlayer";
import { getHeritageObject } from "@/data/heritageObjects";
import masqueImage from "@/assets/masque-ancestral.jpg";
import poterieImage from "@/assets/poterie-traditionnelle.jpg";

const imageMap: Record<string, string> = {
  "masque-ancestral": masqueImage,
  "poterie-traditionnelle": poterieImage,
};

const HeritageObject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const object = getHeritageObject(id || "");

  if (!object) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
            Objet non trouvé
          </h1>
          <Button onClick={() => navigate("/")} variant="default">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={imageMap[object.image]}
          alt={object.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
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
        <div className="bg-card rounded-xl shadow-lg p-6 mb-6 border border-border">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            {object.title}
          </h1>
          <p className="text-primary font-medium mb-4">{object.subtitle}</p>
          
          <AudioPlayer text={object.audioText} />
          
          <div className="mt-6">
            <p className="text-foreground leading-relaxed">
              {object.description}
            </p>
          </div>
        </div>

        {/* Ancestor Chat */}
        <AncestorChat
          ancestorName={object.ancestorName}
          greeting={object.ancestorGreeting}
        />
      </div>
    </div>
  );
};

export default HeritageObject;
