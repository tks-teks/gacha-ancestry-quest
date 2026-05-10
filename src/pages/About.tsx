import { BookOpen, Palette, Heart, Leaf, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import heroImage from "@/assets/hero-fondation.jpg";

const pillars = [
  {
    icon: BookOpen,
    title: "Éducation",
    description: "Formation des jeunes aux métiers du patrimoine, ateliers de tissage Ndop, cours d'histoire locale et bibliothèque Harth accessible à tous.",
  },
  {
    icon: Palette,
    title: "Culture",
    description: "Préservation et valorisation du patrimoine Bamiléké à travers le Centre des Cultures JLD, expositions et événements culturels.",
  },
  {
    icon: Heart,
    title: "Santé",
    description: "Promotion de la médecine traditionnelle camerounaise et des plantes médicinales du Jardin Botanique aux 420+ espèces.",
  },
  {
    icon: Leaf,
    title: "Environnement",
    description: "Conservation de la biodiversité locale, sensibilisation écologique et préservation des espèces végétales endémiques.",
  },
  {
    icon: MapPin,
    title: "Tourisme",
    description: "Développement du tourisme culturel responsable à Bangoulap, visites guidées et découverte des Maisons de Patrimoine.",
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-48 overflow-hidden -mt-14">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-serif font-bold text-foreground animate-fade-in">
            Fondation Jean-Félicien Gacha
          </h1>
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Depuis 2002 • Bangoulap, Cameroun
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="px-4 py-6">
        <Card className="bg-card border-border animate-fade-in">
          <CardContent className="p-4">
            <h2 className="text-lg font-serif font-bold text-foreground mb-3">Notre Histoire</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fondée en 2002 par <strong className="text-foreground">Ly Dumas</strong>, 
              artiste plasticienne et diplomate, la Fondation Jean-Félicien Gacha porte le nom 
              de son père, figure emblématique de Bangoulap.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">
              Le cœur de la Fondation est le <strong className="text-foreground">Centre des Cultures JLD</strong>, 
              abritant la prestigieuse <strong className="text-foreground">Collection Ly et Frédéric Dumas</strong> — 
              un ensemble unique d'œuvres d'art africain contemporain et traditionnel.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Les 5 Piliers */}
      <section className="px-4 pb-8">
        <h2 className="text-lg font-serif font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Les 5 Piliers
        </h2>
        <div className="space-y-3">
          {pillars.map((pillar, index) => (
            <Card 
              key={index} 
              className="bg-card border-border animate-fade-in hover:shadow-md hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <pillar.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 pb-8">
        <Card className="bg-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-4 text-center">
            <h3 className="font-serif font-bold text-foreground mb-2">Nous visiter</h3>
            <p className="text-sm text-muted-foreground">
              Bangoulap, Région de l'Ouest<br />
              Cameroun
            </p>
            <p className="text-xs text-primary mt-2 font-medium">
              fondationjfgacha.org
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Discreet admin link */}
      <div className="px-4 pb-8 text-center">
        <a
          href="/admin/modeles-3d"
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground underline-offset-4 hover:underline transition"
        >
          Administration
        </a>
      </div>
    </Layout>
  );
};

export default About;
