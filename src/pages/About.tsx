import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Palette, Heart, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fondation.jpg";

const pillars = [
  {
    icon: GraduationCap,
    title: "Éducation & Formation",
    description: "Susciter des vocations et développer les talents à travers les ateliers du Centre des Cultures JLD."
  },
  {
    icon: Palette,
    title: "Culture & Arts",
    description: "Préserver et transmettre le patrimoine artistique : perlage, tissage Ndop, sculpture traditionnelle."
  },
  {
    icon: Heart,
    title: "Santé & Action Sociale",
    description: "Promouvoir les savoirs thérapeutiques traditionnels et accompagner les communautés locales."
  },
  {
    icon: Leaf,
    title: "Environnement & Agriculture",
    description: "Valoriser les plantes médicinales du Jardin Botanique Harth et l'agriculture durable."
  },
  {
    icon: MapPin,
    title: "Tourisme",
    description: "Accueillir les visiteurs dans les Maisons de Patrimoine et faire découvrir les Grassfields."
  }
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha"
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
            À propos
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* History Section */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">
            Notre Histoire
          </h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              La <strong>Fondation Jean-Félicien Gacha</strong> est une ONG camerounaise créée en 
              <strong> 2002</strong> par <strong>Ly Dumas</strong> pour honorer la mémoire de son père, 
              Jean-Félicien Gacha (1922-1972), haut fonctionnaire et patriote humaniste.
            </p>
            <p>
              Située à 1500 mètres d'altitude sur les collines de <strong>Bangoulap</strong>, 
              près de Bangangté, dans la région de l'Ouest Cameroun (les "Grassfields"), 
              la Fondation est un lieu unique de préservation et de transmission du patrimoine.
            </p>
            <p>
              Membre de l'<strong>ICOM</strong> (Conseil International des Musées) depuis 2024, 
              elle collabore avec des institutions internationales comme le Musée de la Toile de Jouy 
              et la Pinacothèque de São Paulo.
            </p>
          </div>
        </div>

        {/* Jean-Félicien Gacha */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">
            Jean-Félicien Gacha (1922-1972)
          </h2>
          <p className="text-foreground leading-relaxed">
            Né en 1922 à Bangoulap, Jean-Félicien Gacha fut un haut fonctionnaire camerounais 
            reconnu pour son humanisme et son dévouement au service public. Patriote convaincu, 
            il œuvra toute sa vie pour le développement de sa communauté et la préservation 
            des valeurs traditionnelles. Son héritage continue de vivre à travers la Fondation 
            qui porte son nom.
          </p>
        </div>

        {/* 5 Pillars */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <h2 className="text-xl font-serif font-bold text-foreground mb-6">
            Les 5 Piliers
          </h2>
          <div className="space-y-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">
            Nous Visiter
          </h2>
          <div className="space-y-2 text-foreground">
            <p><strong>Adresse :</strong> Bangoulap, Bangangté, Ouest Cameroun</p>
            <p><strong>Altitude :</strong> 1500 mètres</p>
            <p><strong>Site web :</strong> fondationgacha.org</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
