export interface HeritageObject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  audioText: string;
  image: string;
  ancestorName: string;
  ancestorGreeting: string;
}

export const heritageObjects: HeritageObject[] = [
  {
    id: "tissu-ndop",
    title: "Tissu Ndop",
    subtitle: "Étoffe royale, Ouest Cameroun",
    description: "Le Ndop est l'étoffe royale emblématique des cours de l'Ouest Cameroun. Ce tissu indigo aux motifs géométriques blancs est réalisé selon la technique ancestrale du tie-dye. Réservé aux cérémonies royales et aux grandes occasions, il symbolise le prestige et l'identité culturelle des Bamiléké. La Fondation Jean-Félicien Gacha mène un travail important de valorisation et de recherche sur cette tradition textile unique.",
    audioText: "Je suis le Ndop, tissu des rois et gardien des traditions. Mes fils indigo portent les secrets des cours royales de l'Ouest Cameroun. Chaque motif blanc que tu vois est né de mains patientes qui ont noué et dénoué les fils selon des rituels transmis de génération en génération. Dans les Grassfields, j'habille les chefs lors des cérémonies, je drape les trônes et j'accompagne les grands moments de la vie. Mon bleu profond évoque le ciel nocturne sous lequel nos ancêtres ont tissé leurs premiers rêves.",
    image: "tissu-ndop",
    ancestorName: "Esprit du Ndop",
    ancestorGreeting: "Je suis l'Esprit du Ndop, gardien des traditions textiles royales. Interroge-moi sur l'art du tissage et les cérémonies des cours Bamiléké."
  },
  {
    id: "perlage-royal",
    title: "Perlage Royal",
    subtitle: "Art du perlage Bamiléké",
    description: "L'art du perlage est une tradition ancestrale des Grassfields camerounais. Ces objets cérémoniels recouverts de perles de verre colorées sont des symboles de pouvoir royal. Le Centre des Cultures JLD de la Fondation Gacha abrite des ateliers de formation au perlage, perpétuant ce savoir-faire unique. La Collection Ly et Frédéric Dumas expose de remarquables exemples de cet art raffiné.",
    audioText: "Perle après perle, couleur après couleur, je suis née des mains habiles de nos artisans. Chaque perle que tu vois a été choisie et placée avec intention — le rouge pour la force, le bleu pour la sagesse, le jaune pour la prospérité. Dans les royaumes Bamiléké, seuls les chefs et les notables pouvaient posséder des objets perlés. Je suis un symbole de prestige, un témoignage vivant du raffinement de notre culture. Au Centre des Cultures JLD, les jeunes apprentis perpétuent cet art millénaire.",
    image: "perlage-royal",
    ancestorName: "Esprit du Perlage",
    ancestorGreeting: "Je suis l'Esprit du Perlage, gardienne de l'art des perles royales. Demande-moi les secrets des motifs et des couleurs sacrées."
  },
  {
    id: "masque-bamileke",
    title: "Masque Bamiléké",
    subtitle: "Sculpture sur bois, Grassfields",
    description: "Ce masque cérémoniel Bamiléké est sculpté dans le bois selon des techniques transmises depuis des siècles dans les Grassfields camerounais. Porté lors des cérémonies d'initiation, des funérailles royales et des fêtes traditionnelles, il représente les esprits ancestraux qui veillent sur la communauté. Les Maisons de Patrimoine de la Fondation Gacha présentent des reproductions d'architectures traditionnelles Bamiléké où ces masques trouvaient leur place sacrée.",
    audioText: "Je suis le souffle des ancêtres sculpté dans le bois. Quand un initié me porte, il devient le pont entre le monde visible et le monde invisible. Mes traits racontent l'histoire de notre peuple — les victoires, les épreuves, les espoirs. Dans les cases royales de Bangoulap, j'ai dansé au rythme des tambours lors des grandes cérémonies. Chaque entaille de mon visage est une prière, chaque courbe est une bénédiction. Les sculpteurs qui m'ont créé ont jeûné et prié avant de toucher le bois sacré.",
    image: "masque-bamileke",
    ancestorName: "Esprit du Masque",
    ancestorGreeting: "Je suis l'Esprit du Masque Bamiléké, gardien des cérémonies sacrées. Pose-moi tes questions sur les rites et traditions des Grassfields."
  }
];

export const getHeritageObject = (id: string): HeritageObject | undefined => {
  return heritageObjects.find(obj => obj.id === id);
};
