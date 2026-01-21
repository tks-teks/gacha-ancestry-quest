// 3D annotations for model-viewer hotspots
export interface Annotation3D {
  id: string;
  position: string; // model-viewer format: "x y z"
  normal: string; // model-viewer format: "x y z"
  title: string;
  description: string;
}

export interface ObjectAnnotations {
  objectId: string;
  annotations: Annotation3D[];
}

export const objectAnnotations: ObjectAnnotations[] = [
  {
    objectId: "case-obus-mousgoum",
    annotations: [
      {
        id: "sommet",
        position: "0m 1.4m 0m",
        normal: "0m 1m 0m",
        title: "Sommet ogivale",
        description:
          "Le sommet pointu permet l'évacuation rapide des eaux de pluie et optimise la résistance structurelle sans armature.",
      },
      {
        id: "nervures",
        position: "0.35m 0.7m 0.35m",
        normal: "0.7m 0.2m 0.7m",
        title: "Nervures en relief",
        description:
          "Ces stries servent de marches pour grimper entretenir la case et de canaux pour guider l'eau de pluie vers le sol.",
      },
      {
        id: "base",
        position: "0.4m 0.05m 0.4m",
        normal: "0.7m 0m 0.7m",
        title: "Base circulaire",
        description:
          "La forme ronde répartit les forces uniformément et résiste aux vents violents du Sahel.",
      },
      {
        id: "entree",
        position: "0m 0.25m 0.5m",
        normal: "0m 0m 1m",
        title: "Entrée basse",
        description:
          "L'entrée volontairement basse oblige à se courber en signe de respect et conserve la fraîcheur intérieure.",
      },
    ],
  },
  {
    objectId: "sculpture-recyclee",
    annotations: [
      {
        id: "tete",
        position: "0m 1.8m 0m",
        normal: "0m 1m 0m",
        title: "Tête-tambour",
        description:
          "La tête ronde évoque les tambours traditionnels, symboles de communication entre les mondes.",
      },
      {
        id: "corps",
        position: "0m 1m 0.3m",
        normal: "0m 0m 1m",
        title: "Corps de claviers",
        description:
          "Les touches de clavier tissent le corps, rappelant que nos technologies peuvent renaître en œuvres d'art.",
      },
      {
        id: "bras",
        position: "0.4m 1.2m 0m",
        normal: "1m 0m 0m",
        title: "Bras de fils",
        description:
          "Les câbles électriques forment des bras accueillants, invitant les visiteurs à entrer dans le centre culturel.",
      },
    ],
  },
];

export const getObjectAnnotations = (objectId: string): Annotation3D[] => {
  const obj = objectAnnotations.find((o) => o.objectId === objectId);
  return obj?.annotations || [];
};
