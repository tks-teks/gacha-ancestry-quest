import { Leaf, Sparkles, Heart, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";
import jardinBotaniqueImage from "@/assets/jardin-botanique.jpg";

interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
  uses: string[];
  category: "digestif" | "respiratoire" | "douleur" | "peau" | "spirituel";
}

const medicinalPlants: MedicinalPlant[] = [
  {
    id: "neem",
    name: "Neem (Dongoyaro)",
    scientificName: "Azadirachta indica",
    uses: ["Antipaludéen", "Antibactérien", "Soins de la peau"],
    category: "peau",
  },
  {
    id: "artemisia",
    name: "Armoise africaine",
    scientificName: "Artemisia afra",
    uses: ["Fièvre", "Toux", "Troubles digestifs"],
    category: "respiratoire",
  },
  {
    id: "moringa",
    name: "Moringa",
    scientificName: "Moringa oleifera",
    uses: ["Nutrition", "Énergie", "Immunité"],
    category: "digestif",
  },
  {
    id: "kinkeliba",
    name: "Kinkeliba",
    scientificName: "Combretum micranthum",
    uses: ["Détox", "Digestion", "Minceur"],
    category: "digestif",
  },
  {
    id: "eucalyptus",
    name: "Eucalyptus",
    scientificName: "Eucalyptus globulus",
    uses: ["Rhumes", "Bronchite", "Antiseptique"],
    category: "respiratoire",
  },
  {
    id: "aloe",
    name: "Aloès",
    scientificName: "Aloe vera",
    uses: ["Brûlures", "Cicatrisation", "Hydratation"],
    category: "peau",
  },
  {
    id: "cola",
    name: "Noix de Cola",
    scientificName: "Cola acuminata",
    uses: ["Stimulant", "Cérémonies", "Fatigue"],
    category: "spirituel",
  },
  {
    id: "gingembre",
    name: "Gingembre",
    scientificName: "Zingiber officinale",
    uses: ["Nausées", "Douleurs", "Inflammation"],
    category: "douleur",
  },
];

const categoryConfig = {
  digestif: { icon: Leaf, label: "Système digestif" },
  respiratoire: { icon: Shield, label: "Voies respiratoires" },
  douleur: { icon: Heart, label: "Anti-douleur" },
  peau: { icon: Sparkles, label: "Soins de la peau" },
  spirituel: { icon: Sparkles, label: "Spirituel & énergie" },
};

const BotanicalGarden = () => {
  return (
    <Layout>
      {/* Hero Header */}
      <div className="relative h-56 -mt-14">
        <img
          src={jardinBotaniqueImage}
          alt="Jardin Botanique Médicinal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-background" />

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-serif font-bold text-primary-foreground drop-shadow-lg animate-fade-in">
            Jardin Botanique Médicinal
          </h1>
          <p className="text-primary-foreground/90 text-sm drop-shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Plus de 420 espèces de plantes médicinales
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="px-4 py-6">
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-serif font-bold text-foreground">
              Pharmacopée traditionnelle
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Le jardin botanique de la Fondation préserve le savoir ancestral des tradipraticiens 
            Bamiléké. Chaque plante est cultivée selon les méthodes traditionnelles et documentée 
            pour transmettre ces connaissances aux générations futures.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "420+", label: "Espèces" },
            { value: "5", label: "Hectares" },
            { value: "12", label: "Catégories" },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card rounded-xl p-4 border border-border text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plants Section */}
      <div className="px-4 pb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Plantes emblématiques
        </h3>

        <div className="space-y-3">
          {medicinalPlants.map((plant, index) => {
            const config = categoryConfig[plant.category];
            const IconComponent = config.icon;
            
            return (
              <div
                key={plant.id}
                className="bg-card rounded-xl p-4 border border-border shadow-sm animate-fade-in hover:shadow-md hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-foreground">
                      {plant.name}
                    </h4>
                    <p className="text-xs text-muted-foreground italic mb-2">
                      {plant.scientificName}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {plant.uses.map((use) => (
                        <span
                          key={use}
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 pb-8">
        <div className="bg-primary/10 rounded-xl p-5 border border-primary/20 animate-fade-in">
          <h3 className="font-serif font-bold text-foreground mb-2">
            🌿 Visites guidées disponibles
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Découvrez le jardin avec un guide tradipraticien qui vous initiera 
            aux secrets des plantes médicinales camerounaises.
          </p>
          <p className="text-xs text-primary font-medium">
            Réservation sur place au Centre des Cultures JLD
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8">
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 Fondation Jean-Félicien Gacha
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BotanicalGarden;
