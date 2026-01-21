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
  // Extended knowledge for AI training
  extendedKnowledge?: {
    history: string;
    techniques: string;
    culturalSignificance: string;
    dailyLife: string;
    spirituality: string;
    preservation: string;
  };
}

export const heritageObjects: HeritageObject[] = [
  {
    id: "case-obus-mousgoum",
    title: "Case Obus Mousgoum",
    subtitle: "Architecture traditionnelle, Extrême-Nord Cameroun",
    description: "Les cases obus Mousgoum sont des chefs-d'œuvre architecturaux uniques au monde, érigées par le peuple Mousgoum dans la région de l'Extrême-Nord du Cameroun. Fait remarquable : ce sont traditionnellement les femmes qui construisent ces cases, transmettant leur savoir-faire de mère en fille. Ces structures en terre crue, pouvant atteindre 9 mètres de hauteur, sont bâties sans aucun échafaudage grâce à une technique ancestrale remarquable. Leur forme ogivale et leurs nervures en relief ne sont pas seulement esthétiques : elles servent de marches pour l'entretien et de canaux d'évacuation des eaux de pluie. La Fondation Jean-Félicien Gacha a reconstruit ces cases au sein du Centre des Cultures JLD pour préserver ce patrimoine architectural exceptionnel inscrit au patrimoine mondial de l'humanité.",
    audioText: "Je suis la Case Obus, née des mains habiles des femmes Mousgoum dans les plaines de l'Extrême-Nord. Oui, ce sont nos mères, nos sœurs, nos filles qui m'ont façonnée — car chez les Mousgoum, la construction est l'affaire des femmes, gardiennes du foyer et bâtisseuses de maisons. Sans bois, sans clou, sans échafaudage — uniquement la terre de nos ancêtres façonnée avec sagesse féminine. Mes nervures qui dessinent ma peau ne sont pas là pour décorer : elles sont les marches qui permettent à mes bâtisseuses de monter toujours plus haut, et les sillons qui guident la pluie vers le sol. Ma forme parfaite résiste aux vents du Sahel et garde mes habitants au frais sous le soleil ardent. Au Centre des Cultures JLD de Bangoulap, je me dresse fièrement pour témoigner du génie de nos ancêtres et de la force de nos femmes.",
    image: "case-obus-mousgoum",
    ancestorName: "Esprit de la Case Obus",
    ancestorGreeting: "Je suis l'Esprit de la Case Obus Mousgoum, gardien des secrets de l'architecture de terre. Interroge-moi sur les techniques de construction ancestrales et la vie dans les plaines du Nord.",
    model3dUrl: "/models/case-obus-mousgoum.glb",
    extendedKnowledge: {
      history: `Les Mousgoum (ou Musgum) sont un peuple installé dans la plaine du Logone, à la frontière entre le Cameroun et le Tchad, depuis le XVIe siècle. Leurs cases obus, appelées "teleuk" en langue mousgoum, ont atteint leur apogée architecturale au XIXe siècle. Le déclin de cette tradition a commencé avec la colonisation française dans les années 1930, quand les administrateurs ont imposé des cases rectangulaires jugées "plus modernes". Dans les années 1990, il ne restait presque plus de cases obus habitées. Aujourd'hui, grâce à des initiatives comme celle de la Fondation Gacha, ce patrimoine renaît. Les cases obus ont été inscrites sur la liste indicative du patrimoine mondial de l'UNESCO en 2006.`,
      techniques: `La construction d'une case obus est traditionnellement l'œuvre des femmes Mousgoum, qui transmettent ce savoir-faire de mère en fille depuis des générations. Ce travail nécessite entre 2 et 6 mois d'efforts collectifs féminins. Le matériau principal est le "banco", un mélange de terre argileuse, de paille, de bouse de vache et d'eau, préparé et laissé à fermenter plusieurs jours par les femmes. La construction se fait par anneaux successifs de 40 à 60 cm de hauteur. Chaque anneau doit sécher 2-3 jours avant d'ajouter le suivant. Les nervures (appelées "tobol") sont formées en ajoutant des boudins de terre tous les 30 cm environ. Elles servent de marches pour les bâtisseuses et de canaux d'évacuation des eaux de pluie. Le sommet est scellé par une "clé de voûte" en terre, parfois ornée d'un pot retourné. L'intérieur est enduit d'un mélange de bouse et de terre lissé à la main par les femmes. Le sol est en terre battue, surélevé pour éviter les infiltrations.`,
      culturalSignificance: `La case obus est bien plus qu'un abri : elle représente l'identité du peuple Mousgoum et célèbre le rôle central des femmes dans la société. Chaque famille possède un ensemble de cases formant une concession (saré) : une grande case pour le chef de famille, des cases plus petites pour les épouses, une case-cuisine, et des greniers à mil de forme similaire mais plus petits. La taille et le nombre de cases indiquent le statut social de la famille. La construction est un événement communautaire féminin où les femmes du village travaillent ensemble, les plus expérimentées guidant les plus jeunes, renforçant ainsi les liens sociaux et la transmission intergénérationnelle. Ce rôle de bâtisseuses confère aux femmes Mousgoum un statut particulier de gardiennes du foyer au sens le plus concret. Les cases sont traditionnellement orientées avec l'entrée vers l'est, vers le soleil levant.`,
      dailyLife: `Le peuple Mousgoum est traditionnellement agro-pastoral. Ils cultivent le mil, le sorgho, le maïs et pratiquent la pêche dans le Logone. La case obus maintient une température intérieure de 25-28°C même quand il fait 45°C dehors, grâce à l'inertie thermique de la terre et à la forme ogivale qui favorise la circulation de l'air. L'intérieur est sombre et frais, organisé autour d'un foyer central. Les murs épais (jusqu'à 40 cm à la base) protègent aussi des vents de sable du Sahel. La nuit, la famille dort sur des nattes ou des lits de terre surélevés.`,
      spirituality: `Pour les Mousgoum, la terre n'est pas un simple matériau mais un élément sacré lié aux ancêtres. Avant de commencer la construction, des rituels sont accomplis pour demander la protection des esprits. Le maître-bâtisseur (mbang teleuk) possède des connaissances transmises de père en fils sur plusieurs générations. Il connaît les incantations appropriées et les moments propices pour chaque étape. La case obus est considérée comme un être vivant qui "respire" à travers ses murs poreux. Quand une case s'effondre de vieillesse, c'est comme la mort d'un ancien de la famille.`,
      preservation: `La Fondation Jean-Félicien Gacha a fait reconstruire des cases obus authentiques au Centre des Cultures JLD de Bangoulap par des maîtres-artisans Mousgoum venus de l'Extrême-Nord. Ce projet vise à transmettre le savoir-faire aux jeunes générations et à sensibiliser les visiteurs à ce patrimoine menacé. L'entretien annuel consiste à reboucher les fissures avec du banco frais avant la saison des pluies. Les nervures sont inspectées pour s'assurer qu'elles évacuent correctement l'eau. Avec un bon entretien, une case obus peut durer 50 à 100 ans.`
    }
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
    model3dUrl: "/models/sculpture-recyclee.glb",
    extendedKnowledge: {
      history: `Cette sculpture a été créée au Cameroun dans les années 2010, dans le contexte d'un mouvement artistique africain contemporain qui récupère les déchets technologiques pour créer des œuvres engagées. L'Afrique reçoit une grande partie des déchets électroniques du monde (e-waste), et des artistes comme ceux du Ghana (Agbogbloshie) ou du Cameroun transforment ce problème en opportunité artistique. La sculpture du Centre des Cultures JLD s'inscrit dans cette tradition de "trash art" ou art de récupération, qui dénonce la surconsommation tout en célébrant la créativité africaine.`,
      techniques: `L'artiste a utilisé principalement des claviers d'ordinateur AZERTY récupérés, dont les touches ont été démontées une à une. Le corps est constitué d'une armature métallique (fils de fer et tiges) recouverte de touches de clavier assemblées comme des écailles. La tête rappelle un masque traditionnel camerounais, avec des yeux faits de composants électroniques (condensateurs, LED). Des câbles colorés (rouge, bleu, vert) forment une chevelure ou des ornements. L'assemblage utilise colle, soudure et ligatures. Chaque pièce est positionnée avec soin pour créer des motifs rappelant les scarifications traditionnelles ou les tissages.`,
      culturalSignificance: `Cette œuvre représente le dialogue entre l'Afrique traditionnelle et l'Afrique moderne. Elle interroge notre rapport à la technologie et à la consommation. Le visage rappelle les masques Bamiléké ou Bamoun de l'Ouest Cameroun, créant un lien avec les ancêtres. Mais les matériaux — déchets de la mondialisation — parlent du présent et du futur. La sculpture incarne les cinq piliers de la Fondation Gacha, notamment l'environnement et la culture. Elle montre que l'innovation peut respecter les traditions. Elle est devenue un symbole du Centre des Cultures JLD et un point de rencontre pour les visiteurs.`,
      dailyLife: `La sculpture accueille les visiteurs à l'entrée du Centre des Cultures JLD à Bangoulap. Elle est exposée en extérieur, sous un auvent, résistant aux intempéries grâce à un traitement protecteur. Les guides du Centre expliquent aux visiteurs la symbolique de chaque élément. Les enfants sont particulièrement fascinés et cherchent à identifier les touches de clavier et les composants. La sculpture est souvent photographiée et partagée sur les réseaux sociaux, devenant ambassadrice de la Fondation. Des ateliers de création avec des déchets électroniques sont organisés pour les jeunes, inspirés par cette œuvre.`,
      spirituality: `Dans la tradition africaine, les masques et sculptures sont des réceptacles d'énergie spirituelle. Cette sculpture moderne perpétue cette croyance : elle est habitée par un "esprit" — celui de notre époque, fait de données, de connexions, d'échanges virtuels. Les touches de clavier portent les lettres de toutes les langues, tous les messages jamais tapés. La sculpture devient ainsi un gardien des communications humaines. Son regard bienveillant, fait de circuits électroniques, veille sur le Centre comme le feraient les statues protectrices des villages traditionnels. Elle nous rappelle que même les objets "morts" peuvent renaître et acquérir une âme.`,
      preservation: `La sculpture nécessite un entretien régulier : nettoyage des touches pour éviter l'accumulation de poussière, vérification des soudures et ligatures, application périodique d'un vernis protecteur contre l'humidité. Les pièces endommagées sont remplacées par des composants similaires récupérés. La Fondation documente l'œuvre par des photographies et vidéos pour la mémoire. Des artistes locaux sont formés aux techniques de sculpture recyclée pour perpétuer cette forme d'art. L'œuvre inspire d'autres créations dans la région et sensibilise à la gestion des déchets électroniques.`
    }
  }
];

export const getHeritageObject = (id: string): HeritageObject | undefined => {
  return heritageObjects.find(obj => obj.id === id);
};