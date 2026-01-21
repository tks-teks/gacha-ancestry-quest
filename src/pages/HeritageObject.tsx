import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AncestorChat } from "@/components/AncestorChat";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Layout } from "@/components/Layout";
import { Object3DViewer } from "@/components/Object3DViewer";
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
      {/* Hero Image with Parallax */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <ParallaxImage
          src={imageMap[object.image]}
          alt={object.title}
          className="h-full"
        />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10 animate-fade-in"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Floating badge */}
        <div className="absolute bottom-6 right-4 z-10">
          <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-float">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Expérience AR</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 -mt-10 relative z-10">
        {/* Title Card */}
        <div className="bg-card rounded-xl shadow-lg p-5 sm:p-6 mb-6 border border-border">
          <h1 
            className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2 animate-slide-up"
          >
            {object.title}
          </h1>
          <p 
            className="text-primary font-medium mb-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {object.subtitle}
          </p>
          
          {/* Animated decorative line */}
          <div className="relative h-0.5 bg-border rounded-full mb-6 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent animate-highlight"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <AudioPlayer text={object.audioText} />
          </div>
        </div>

        {/* Photo Gallery Section */}
        {galleryImages.length > 0 && (
          <div 
            className="bg-card rounded-xl shadow-lg p-4 sm:p-5 mb-6 border border-border animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Images className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-lg font-serif font-semibold text-foreground">
                Galerie Photos
              </h2>
            </div>
            <ImageGallery images={galleryImages} />
          </div>
        )}

        {/* 3D Viewer Section */}
        <div 
          className="bg-card rounded-xl shadow-lg p-4 sm:p-5 mb-6 border border-border animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-serif font-semibold text-foreground">
              Visualisation 3D & Réalité Augmentée
            </h2>
          </div>
          
          <Object3DViewer
            modelUrl={object.model3dUrl}
            iosModelUrl={object.iosModelUrl}
            posterUrl={imageMap[object.image]}
            alt={object.title}
            showARButton={true}
            annotations={annotations}
          />
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            Faites glisser pour faire tourner • Pincez pour zoomer • Cliquez sur les points "?" pour les annotations
          </p>
        </div>

        {/* Description Section */}
        <div 
          className="bg-card rounded-xl shadow-lg p-5 sm:p-6 mb-6 border border-border"
        >
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            À propos de cet objet
          </h2>
          
          <AnimatedDescription text={object.description} />
        </div>

        {/* Guestbook */}
        <div className="animate-fade-in mb-6" style={{ animationDelay: "0.4s" }}>
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
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HeritageObject;
