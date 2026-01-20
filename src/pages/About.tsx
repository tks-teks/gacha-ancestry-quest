import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Palette, Heart, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-fondation.jpg";

const pillars = [
  {
    icon: BookOpen,
    title: "Éducation",
    description: "Formation des jeunes aux métiers du patrimoine, ateliers de tissage Ndop, cours d'histoire locale et bibliothèque Harth accessible à tous.",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: Palette,
    title: "Culture",
    description: "Préservation et valorisation du patrimoine Bamiléké à travers le Centre des Cultures JLD, expositions et événements culturels.",
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: Heart,
    title: "Santé",
    description: "Promotion de la médecine traditionnelle camerounaise et des plantes médicinales du Jardin Botanique aux 420+ espèces.",
    color: "text-red-600 dark:text-red-400"
  },
  {
    icon: Leaf,
    title: "Environnement",
    description: "Conservation de la biodiversité locale, sensibilisation écologique et préservation des espèces végétales endémiques.",
    color: "text-green-600 dark:text-green-400"
  },
  {
    icon: MapPin,
    title: "Tourisme",
    description: "Développement du tourisme culturel responsable à Bangoulap, visites guidées et découverte des Maisons de Patrimoine.",
    color: "text-amber-600 dark:text-amber-400"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">À propos</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-48 overflow-hidden">
        <img
          src={heroImage}
          alt="Fondation Jean-Félicien Gacha"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-foreground">
            Fondation Jean-Félicien Gacha
          </h2>
          <p className="text-sm text-muted-foreground">Depuis 2002 • Bangoulap, Cameroun</p>
        </div>
      </section>

      {/* Histoire */}
      <section className="container mx-auto px-4 py-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Notre Histoire</h3>
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
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Les 5 Piliers</h3>
        <div className="space-y-3">
          {pillars.map((pillar, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-4 flex gap-4">
                <div className={`p-3 rounded-full bg-muted ${pillar.color}`}>
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{pillar.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 pb-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-foreground mb-2">Nous visiter</h3>
            <p className="text-sm text-muted-foreground">
              Bangoulap, Région de l'Ouest<br />
              Cameroun
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              fondationjfgacha.org
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;
