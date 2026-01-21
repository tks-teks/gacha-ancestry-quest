// Guided tours / thematic paths data
export interface TourStop {
  objectId: string;
  order: number;
  highlight: string; // What to focus on for this tour
}

export interface GuidedTour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon name
  duration: string; // e.g. "20 min"
  stops: TourStop[];
  color: string; // Tailwind color class
}

export const guidedTours: GuidedTour[] = [
  {
    id: "architecture",
    title: "Architecture Traditionnelle",
    subtitle: "Les génies bâtisseurs du Cameroun",
    description:
      "Découvrez les techniques de construction ancestrales et les secrets d'une architecture durable née de la terre.",
    icon: "Building2",
    duration: "15 min",
    color: "from-amber-500 to-orange-600",
    stops: [
      {
        objectId: "case-obus-mousgoum",
        order: 1,
        highlight: "Observez les nervures et la forme ogivale parfaite",
      },
    ],
  },
  {
    id: "art-contemporain",
    title: "Art Contemporain",
    subtitle: "Quand les déchets deviennent beauté",
    description:
      "Explorez comment les artistes camerounais transforment les rebuts de la modernité en œuvres d'art porteuses de sens.",
    icon: "Palette",
    duration: "10 min",
    color: "from-emerald-500 to-teal-600",
    stops: [
      {
        objectId: "sculpture-recyclee",
        order: 1,
        highlight: "Identifiez les matériaux recyclés qui composent la sculpture",
      },
    ],
  },
  {
    id: "decouverte",
    title: "Découverte Complète",
    subtitle: "Le meilleur du Centre des Cultures",
    description:
      "Un parcours complet pour découvrir les pièces maîtresses de la collection Ly et Frédéric Dumas.",
    icon: "Compass",
    duration: "25 min",
    color: "from-primary to-accent",
    stops: [
      {
        objectId: "case-obus-mousgoum",
        order: 1,
        highlight: "Commencez par l'architecture traditionnelle du Nord",
      },
      {
        objectId: "sculpture-recyclee",
        order: 2,
        highlight: "Terminez par l'art contemporain écologique",
      },
    ],
  },
];

export const getGuidedTour = (id: string): GuidedTour | undefined => {
  return guidedTours.find((tour) => tour.id === id);
};

export const getTourForObject = (objectId: string): GuidedTour[] => {
  return guidedTours.filter((tour) =>
    tour.stops.some((stop) => stop.objectId === objectId)
  );
};
