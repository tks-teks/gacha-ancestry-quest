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
    id: "masque-ancestral",
    title: "Masque Ancestral",
    subtitle: "Bois sculpté, XIXe siècle",
    description: "Ce masque cérémoniel représente l'esprit des ancêtres qui veillent sur la communauté. Sculpté dans le bois d'iroko, il était porté lors des cérémonies d'initiation et des rites funéraires. Les motifs géométriques symbolisent le lien entre le monde visible et invisible.",
    audioText: "Bienvenue, voyageur du temps. Je suis le gardien des mémoires anciennes. Ce masque que tu contemples n'est pas simplement un objet d'art — c'est un pont entre les vivants et les esprits de nos ancêtres. Chaque gravure raconte une histoire, chaque courbe porte une prière. Les artisans de mon peuple ont insufflé leur âme dans ce bois sacré.",
    image: "masque-ancestral",
    ancestorName: "Esprit du Masque",
    ancestorGreeting: "Je suis l'Esprit du Masque, gardien des traditions. Pose-moi tes questions sur les mystères de notre patrimoine."
  },
  {
    id: "poterie-traditionnelle",
    title: "Poterie Cérémonielle",
    subtitle: "Terre cuite, XVIIIe siècle",
    description: "Cette poterie aux motifs géométriques complexes était utilisée lors des cérémonies de libation. Les symboles représentent la fertilité de la terre et l'abondance des récoltes. La technique de cuisson traditionnelle donne cette teinte terre cuite caractéristique.",
    audioText: "De mes mains de potière sont nées mille formes. Cette jarre que tu admires portait l'eau sacrée des cérémonies. Chaque losange gravé est un vœu de prospérité, chaque ligne ondulée évoque la rivière nourricière. La terre dont je suis faite vient des berges où nos mères lavaient le lin.",
    image: "poterie-traditionnelle",
    ancestorName: "Esprit de la Poterie",
    ancestorGreeting: "Je suis l'Esprit de la Poterie, née de la terre et du feu. Interroge-moi sur l'art ancestral de nos artisans."
  }
];

export const getHeritageObject = (id: string): HeritageObject | undefined => {
  return heritageObjects.find(obj => obj.id === id);
};
