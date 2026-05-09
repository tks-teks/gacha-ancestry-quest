import { MapPin, Home } from "lucide-react";
import { Layout } from "@/components/Layout";
import maisonMousgoumImage from "@/assets/maison-mousgoum.jpg";
import maisonBamilekeImage from "@/assets/maison-bamileke.jpg";
import maisonBororoImage from "@/assets/maison-bororo.jpg";

interface HeritageHouse {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  characteristics: string[];
}

const heritageHouses: HeritageHouse[] = [
  {
    id: "mousgoum",
    name: "Maison Mousgoum",
    region: "Extrême-Nord",
    image: maisonMousgoumImage,
    description:
      "Les cases obus Mousgoum sont des merveilles architecturales en terre crue, reconnaissables à leur forme ovoïde unique. Ces structures bioclimatiques régulent naturellement la température intérieure, offrant fraîcheur en saison chaude.",
    characteristics: [
      "Structure en terre crue",
      "Forme ovoïde distinctive",
      "Motifs géométriques en relief",
      "Architecture bioclimatique",
    ],
  },
  {
    id: "bamileke",
    name: "Maison Bamiléké",
    region: "Hauts-Plateaux de l'Ouest",
    image: maisonBamilekeImage,
    description:
      "L'architecture royale Bamiléké se distingue par ses piliers sculptés et ses toitures imposantes. Les chefferies traditionnelles sont ornées de motifs symboliques représentant la cosmogonie et la hiérarchie sociale du royaume.",
    characteristics: [
      "Piliers en bois sculpté",
      "Toiture en chaume",
      "Motifs royaux symboliques",
      "Organisation spatiale hiérarchique",
    ],
  },
  {
    id: "bororo",
    name: "Habitat Bororo",
    region: "Adamaoua et Nord",
    image: maisonBororoImage,
    description:
      "Les Bororo (Mbororo ou Peuls nomades) vivent dans des habitations mobiles adaptées à leur mode de vie pastoral. Leurs tentes colorées reflètent leur culture riche en textiles et leur connexion profonde avec le bétail.",
    characteristics: [
      "Structure démontable",
      "Textiles colorés traditionnels",
      "Adaptation au nomadisme",
      "Artisanat de cuir et tissage",
    ],
  },
];

const HeritageHouses = () => {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-xl font-serif font-bold">Maisons de Patrimoine</h1>
        <p className="text-sm text-primary-foreground/80">Architecture traditionnelle du Cameroun</p>
      </div>

      {/* Introduction */}
      <div className="px-4 py-6">
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-serif font-bold text-foreground">
              Diversité architecturale
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Le Cameroun, "Afrique en miniature", présente une extraordinaire diversité 
            d'architectures traditionnelles. Chaque région a développé des techniques 
            de construction adaptées à son climat et à sa culture.
          </p>
        </div>
      </div>

      {/* Heritage Houses Gallery */}
      <div className="px-4 pb-8 space-y-6">
        {heritageHouses.map((house, index) => (
          <div
            key={house.id}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-md animate-fade-in group"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={house.image}
                alt={house.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                <h3 className="text-lg font-serif font-bold text-primary-foreground">
                  {house.name}
                </h3>
                <p className="text-sm text-primary-foreground/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {house.region}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-foreground text-sm leading-relaxed mb-4">
                {house.description}
              </p>

              {/* Characteristics */}
              <div className="flex flex-wrap gap-2">
                {house.characteristics.map((char) => (
                  <span
                    key={char}
                    className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
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

export default HeritageHouses;
