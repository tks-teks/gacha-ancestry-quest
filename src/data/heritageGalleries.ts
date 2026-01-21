// Gallery images for each heritage object
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface HeritageGallery {
  objectId: string;
  images: GalleryImage[];
}

// Import images
import caseObusMousgoumImage from "@/assets/case-obus-mousgoum.jpg";
import sculptureRecycleeImage from "@/assets/sculpture-recyclee.jpg";
import maisonMousgoumImage from "@/assets/maison-mousgoum.jpg";
import maisonBamileakeImage from "@/assets/maison-bamileke.jpg";
import maisonBororoImage from "@/assets/maison-bororo.jpg";
import jardinBotaniqueImage from "@/assets/jardin-botanique.jpg";
import heroFondationImage from "@/assets/hero-fondation.jpg";

export const heritageGalleries: HeritageGallery[] = [
  {
    objectId: "case-obus-mousgoum",
    images: [
      {
        src: caseObusMousgoumImage,
        alt: "Case Obus Mousgoum - Vue principale",
        caption: "Vue d'ensemble des cases obus au Centre des Cultures JLD",
      },
      {
        src: maisonMousgoumImage,
        alt: "Case Obus Mousgoum - Détails architecturaux",
        caption: "Les nervures en relief servant de marches et d'évacuation d'eau",
      },
      {
        src: heroFondationImage,
        alt: "Centre des Cultures JLD - Bangoulap",
        caption: "Le Centre des Cultures JLD où sont préservées les cases",
      },
    ],
  },
  {
    objectId: "sculpture-recyclee",
    images: [
      {
        src: sculptureRecycleeImage,
        alt: "Sculpture Recyclée - Vue principale",
        caption: "Sculpture anthropomorphe à l'entrée du Centre des Cultures JLD",
      },
      {
        src: maisonBamileakeImage,
        alt: "Contexte artistique - Maison Bamiléké",
        caption: "L'art contemporain dialogue avec l'architecture traditionnelle",
      },
      {
        src: jardinBotaniqueImage,
        alt: "Environnement - Jardin Botanique",
        caption: "La sculpture s'inscrit dans un environnement naturel préservé",
      },
    ],
  },
];

export const getHeritageGallery = (objectId: string): GalleryImage[] => {
  const gallery = heritageGalleries.find((g) => g.objectId === objectId);
  return gallery?.images || [];
};
