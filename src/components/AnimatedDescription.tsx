import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnimatedDescriptionProps {
  text: string;
  keywords?: { word: string; info: string }[];
}

const defaultKeywords = [
  { word: "Grassfields", info: "Région des hauts plateaux de l'Ouest Cameroun, berceau de la culture Bamiléké" },
  { word: "Bamiléké", info: "Groupe ethnique majeur de l'Ouest Cameroun, connu pour son art et ses traditions royales" },
  { word: "royale", info: "Symbole de prestige réservé aux chefs et aux membres de la cour" },
  { word: "royal", info: "Symbole de prestige réservé aux chefs et aux membres de la cour" },
  { word: "cérémonie", info: "Rituel sacré marquant les moments importants de la vie communautaire" },
  { word: "cérémonies", info: "Rituels sacrés marquant les moments importants de la vie communautaire" },
  { word: "ancestral", info: "Transmis de génération en génération depuis des siècles" },
  { word: "ancestraux", info: "Transmis de génération en génération depuis des siècles" },
  { word: "sacré", info: "Objet ou lieu doté d'une signification spirituelle profonde" },
  { word: "sacrée", info: "Objet ou lieu doté d'une signification spirituelle profonde" },
  { word: "indigo", info: "Teinture naturelle bleue utilisée traditionnellement pour le textile Ndop" },
  { word: "perles", info: "Symbole de richesse et de statut social dans la culture Bamiléké" },
  { word: "Fondation", info: "Fondation Jean-Félicien Gacha, dédiée à la préservation du patrimoine camerounais" },
];

export const AnimatedDescription = ({
  text,
  keywords = defaultKeywords,
}: AnimatedDescriptionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);

  // Split text into sentences for animation
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleParagraphs((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = containerRef.current?.querySelectorAll("[data-index]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sentences]);

  // Highlight keywords in text
  const highlightKeywords = (sentence: string) => {
    let result: (string | JSX.Element)[] = [sentence];

    keywords.forEach(({ word, info }) => {
      result = result.flatMap((part) => {
        if (typeof part !== "string") return [part];

        const regex = new RegExp(`(${word})`, "gi");
        const parts = part.split(regex);

        return parts.map((p, i) => {
          if (p.toLowerCase() === word.toLowerCase()) {
            return (
              <TooltipProvider key={`${word}-${i}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="relative inline-block cursor-help group">
                      <span className="relative z-10 text-primary font-medium transition-colors group-hover:text-primary-foreground">
                        {p}
                      </span>
                      <span className="absolute inset-0 bg-primary/20 group-hover:bg-primary rounded transition-all duration-300 -mx-0.5 px-0.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-xs bg-popover text-popover-foreground border border-border shadow-lg"
                  >
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{info}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          return p;
        });
      });
    });

    return result;
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {sentences.map((sentence, index) => (
        <p
          key={index}
          data-index={index}
          className={`text-foreground leading-relaxed text-sm sm:text-base transition-all duration-700 ${
            visibleParagraphs.includes(index)
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
          }}
        >
          {highlightKeywords(sentence)}
        </p>
      ))}
    </div>
  );
};
