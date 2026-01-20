import { useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, FlaskConical, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import gardenImage from "@/assets/jardin-botanique.jpg";

const plants = [
  {
    name: "Artemisia annua",
    usage: "Antipaludéen traditionnel",
    description: "Utilisée depuis des siècles pour combattre la fièvre et le paludisme."
  },
  {
    name: "Moringa oleifera",
    usage: "Nutrition & vitalité",
    description: "L'arbre miracle, riche en vitamines et minéraux essentiels."
  },
  {
    name: "Aloe vera",
    usage: "Soins de la peau",
    description: "Plante aux propriétés cicatrisantes et hydratantes reconnues."
  },
  {
    name: "Hibiscus sabdariffa",
    usage: "Infusion digestive",
    description: "Le bissap, boisson traditionnelle aux vertus rafraîchissantes."
  },
  {
    name: "Zingiber officinale",
    usage: "Anti-inflammatoire",
    description: "Le gingembre, racine aux multiples bienfaits thérapeutiques."
  },
  {
    name: "Cymbopogon citratus",
    usage: "Relaxant & digestif",
    description: "La citronnelle, utilisée en infusion et comme répulsif naturel."
  }
];

const BotanicalGarden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={gardenImage}
          alt="Jardin Botanique Harth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-background" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-serif font-bold text-primary-foreground drop-shadow-lg">
            Jardin Botanique Harth
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Introduction */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-foreground">
                420+ Variétés
              </h2>
              <p className="text-sm text-muted-foreground">
                Plantes médicinales traditionnelles
              </p>
            </div>
          </div>
          <p className="text-foreground leading-relaxed">
            Le Jardin Botanique Harth de la Fondation Jean-Félicien Gacha préserve plus de 
            420 variétés de plantes médicinales utilisées dans la pharmacopée traditionnelle 
            camerounaise. Ce conservatoire vivant permet la transmission des savoirs 
            thérapeutiques ancestraux aux nouvelles générations.
          </p>
        </div>

        {/* Laboratory */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Laboratoire Traditionnel
              </h2>
            </div>
          </div>
          <p className="text-foreground leading-relaxed">
            Un laboratoire dédié permet d'étudier et de documenter les propriétés 
            des plantes, tout en formant les jeunes aux techniques de préparation 
            des remèdes traditionnels dans le respect des savoirs ancestraux.
          </p>
        </div>

        {/* Plants List */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Plantes Emblématiques
              </h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {plants.map((plant, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground italic">
                      {plant.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {plant.usage}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plant.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Info */}
        <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="font-serif font-bold text-foreground mb-2">
            Visites Guidées
          </h3>
          <p className="text-foreground text-sm">
            Le jardin est accessible lors des visites de la Fondation. 
            Les guides traditionnels partagent les secrets des plantes 
            et leurs usages thérapeutiques ancestraux.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BotanicalGarden;
