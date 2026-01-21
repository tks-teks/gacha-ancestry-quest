export interface HeritageObject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  audioText: string;
  image: string;
  ancestorName: string;
  ancestorGreeting: string;
  model3dUrl?: string;
  iosModelUrl?: string;
}

export const heritageObjects: HeritageObject[] = [
  {
    id: "case-obus-mousgoum",
    title: "Case Obus Mousgoum",
    subtitle: "Architecture traditionnelle, Extrême-Nord Cameroun",
    description: "Les cases obus Mousgoum sont des chefs-d'œuvre architecturaux uniques au monde, érigées par le peuple Mousgoum dans la région de l'Extrême-Nord du Cameroun. Ces structures en terre crue, pouvant atteindre 9 mètres de hauteur, sont construites sans aucun échafaudage grâce à une technique ancestrale remarquable. Leur forme ogivale et leurs nervures en relief ne sont pas seulement esthétiques : elles servent de marches pour l'entretien et de canaux d'évacuation des eaux de pluie. La Fondation Jean-Félicien Gacha a reconstruit ces cases au sein du Centre des Cultures JLD pour préserver ce patrimoine architectural exceptionnel inscrit au patrimoine mondial de l'humanité.",
    audioText: "Je suis la Case Obus, née des mains habiles du peuple Mousgoum dans les plaines de l'Extrême-Nord. Sans bois, sans clou, sans échafaudage — uniquement la terre de nos ancêtres façonnée avec sagesse. Mes nervures qui dessinent ma peau ne sont pas là pour décorer : elles sont les marches qui permettent à mes bâtisseurs de monter toujours plus haut, et les sillons qui guident la pluie vers le sol. Ma forme parfaite résiste aux vents du Sahel et garde mes habitants au frais sous le soleil ardent. Au Centre des Cultures JLD de Bangoulap, je me dresse fièrement pour témoigner du génie de nos ancêtres.",
    image: "case-obus-mousgoum",
    ancestorName: "Esprit de la Case Obus",
    ancestorGreeting: "Je suis l'Esprit de la Case Obus Mousgoum, gardien des secrets de l'architecture de terre. Interroge-moi sur les techniques de construction ancestrales et la vie dans les plaines du Nord.",
    model3dUrl: "/models/case-obus-mousgoum.glb"
  },
  {
    id: "sculpture-recyclee",
    title: "Sculpture Recyclée",
    subtitle: "Art contemporain écologique, Centre des Cultures JLD",
    description: "Cette sculpture anthropomorphe fascinante est une œuvre d'art contemporain créée entièrement à partir de matériaux recyclés : claviers d'ordinateur, pièces électroniques, fils, métal et objets du quotidien réinventés. Elle incarne la philosophie de la Fondation Jean-Félicien Gacha qui promeut le développement durable et la créativité artistique. Cette œuvre unique dialogue entre tradition et modernité, rappelant les masques ancestraux tout en portant un message fort sur l'environnement et la transformation des déchets en beauté. Positionnée à l'entrée du Centre des Cultures JLD, elle accueille les visiteurs avec son regard bienveillant fait de composants électroniques.",
    audioText: "Je suis né des rebuts de votre monde moderne. Claviers abandonnés, circuits oubliés, fils enchevêtrés — tous ont trouvé en moi une nouvelle vie. Mon créateur a vu dans ces déchets non pas une fin, mais un nouveau commencement. Ma tête ronde comme un tambour traditionnel, mon corps tissé de touches de clavier, je suis le pont entre vos technologies et l'esprit créateur de nos ancêtres. Au Centre des Cultures JLD, je vous rappelle que rien ne se perd vraiment, que tout peut renaître sous des mains inspirées. Je suis le gardien de l'entrée, une sentinelle écologique qui vous invite à repenser votre rapport aux objets.",
    image: "sculpture-recyclee",
    ancestorName: "Esprit de la Sculpture",
    ancestorGreeting: "Je suis l'Esprit de la Sculpture Recyclée, témoin de la créativité humaine et gardien de l'environnement. Questionne-moi sur l'art du recyclage et le message écologique que je porte.",
    model3dUrl: "/models/sculpture-recyclee.glb"
  }
];

export const getHeritageObject = (id: string): HeritageObject | undefined => {
  return heritageObjects.find(obj => obj.id === id);
};
