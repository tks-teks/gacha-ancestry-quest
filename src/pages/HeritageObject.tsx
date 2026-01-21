import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AncestorChat } from "@/components/AncestorChat";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Layout } from "@/components/Layout";
import { Object3DViewer } from "@/components/Object3DViewer";
import { SculptureRecyclee3D } from "@/components/SculptureRecyclee3D";
import { AnimatedDescription } from "@/components/AnimatedDescription";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ImageGallery } from "@/components/ImageGallery";
import { Guestbook } from "@/components/Guestbook";
import { getHeritageObject } from "@/data/heritageObjects";
import { getHeritageGallery } from "@/data/heritageGalleries";
import { getObjectAnnotations } from "@/data/annotations3D";
import caseObusMousgoumImage from "@/assets/case-obus-mousgoum.jpg";
import sculptureRecycleeImage from "@/assets/sculpture-recyclee.jpg";

const imageMap: Record<string, string> = {
  "case-obus-mousgoum": caseObusMousgoumImage,
  "sculpture-recyclee": sculptureRecycleeImage,
};

const HeritageObject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const object = getHeritageObject(id || "");
  const galleryImages = getHeritageGallery(id || "");
  const annotations = getObjectAnnotations(id || "");

  if (!object) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
              Objet non trouvé
            </h1>
            <Button onClick={() => navigate("/")} variant="default">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showHeader={false}>
      {/* Hero Image with Parallax - Optimized for mobile */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <ParallaxImage
          src={imageMap[object.image]}
          alt={object.title}
          className="h-full"
        />
        
        {/* Back Button - Larger touch target for mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 w-11 h-11 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 animate-fade-in shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Floating AR badge - Better mobile positioning */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-float">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Expérience AR</span>
          </div>
        </div>
      </div>

      {/* Content - Improved mobile spacing */}
      <div className="px-3 sm:px-4 pb-24 md:pb-8 -mt-8 relative z-10">
        {/* Title Card - Better mobile typography */}
        <div className="bg-card rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-border">
          <h1 
            className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mb-1.5 sm:mb-2 animate-slide-up leading-tight"
          >
            {object.title}
          </h1>
          <p 
            className="text-sm sm:text-base text-primary font-medium mb-3 sm:mb-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {object.subtitle}
          </p>
          
          {/* Animated decorative line */}
          <div className="relative h-0.5 bg-border rounded-full mb-4 sm:mb-6 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent animate-highlight"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <AudioPlayer text={object.audioText} />
          </div>
        </div>

        {/* Photo Gallery Section - Compact on mobile */}
        {galleryImages.length > 0 && (
          <div 
            className="bg-card rounded-xl shadow-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-border animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Images className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              </div>
              <h2 className="text-base sm:text-lg font-serif font-semibold text-foreground">
                Galerie Photos
              </h2>
            </div>
            <ImageGallery images={galleryImages} />
          </div>
        )}

        {/* 3D Viewer Section - Full-width and taller on mobile for better AR */}
        <div 
          className="bg-card rounded-xl shadow-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-border animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <h2 className="text-base sm:text-lg font-serif font-semibold text-foreground">
              3D & Réalité Augmentée
            </h2>
          </div>
          
          {/* Use procedural 3D for sculpture-recyclee, model-viewer for others */}
          {object.id === "sculpture-recyclee" ? (
            <SculptureRecyclee3D />
          ) : (
            <Object3DViewer
              modelUrl={object.model3dUrl}
              iosModelUrl={object.iosModelUrl}
              posterUrl={imageMap[object.image]}
              alt={object.title}
              showARButton={true}
              annotations={annotations}
            />
          )}
          
          <p className="text-[11px] sm:text-xs text-muted-foreground text-center mt-2.5 sm:mt-3 leading-relaxed">
            Glissez pour tourner • Pincez pour zoomer{object.id !== "sculpture-recyclee" && " • Touchez \"?\" pour les détails"}
          </p>
        </div>

        {/* Description Section - Improved readability */}
        <div 
          className="bg-card rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-border"
        >
          <h2 className="text-base sm:text-lg font-serif font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-5 sm:h-6 bg-primary rounded-full" />
            À propos de cet objet
          </h2>
          
          <AnimatedDescription text={object.description} />
        </div>

        {/* Guestbook - Better mobile spacing */}
        <div className="animate-fade-in mb-4 sm:mb-6" style={{ animationDelay: "0.4s" }}>
          <Guestbook objectId={object.id} objectTitle={object.title} />
        </div>

        {/* Ancestor Chat */}
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <AncestorChat
            ancestorName={object.ancestorName}
            greeting={object.ancestorGreeting}
            objectContext={{
              title: object.title,
              subtitle: object.subtitle,
              description: object.description,
              audioText: object.audioText,
              ancestorName: object.ancestorName,
              extendedKnowledge: object.extendedKnowledge,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HeritageObject;
