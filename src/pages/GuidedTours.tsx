import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Palette, Compass, Clock, ChevronRight, Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { guidedTours, GuidedTour } from "@/data/guidedTours";
import { heritageObjects } from "@/data/heritageObjects";

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  Building2,
  Palette,
  Compass,
};

const GuidedTours = () => {
  const navigate = useNavigate();
  const [activeTour, setActiveTour] = useState<GuidedTour | null>(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const startTour = (tour: GuidedTour) => {
    setActiveTour(tour);
    setCurrentStopIndex(0);
  };

  const goToStop = (index: number) => {
    if (!activeTour) return;
    const stop = activeTour.stops[index];
    navigate(`/objet/${stop.objectId}`, {
      state: { tourId: activeTour.id, stopIndex: index },
    });
  };

  const getObjectTitle = (objectId: string) => {
    return heritageObjects.find((o) => o.id === objectId)?.title || objectId;
  };

  if (activeTour) {
    return (
      <Layout>
        <div className="px-4 py-6">
          {/* Tour header */}
          <div
            className={`bg-gradient-to-r ${activeTour.color} rounded-xl p-5 text-primary-foreground mb-6`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTour(null)}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20 mb-3"
            >
              ← Retour aux parcours
            </Button>
            <h1 className="text-2xl font-serif font-bold mb-1">
              {activeTour.title}
            </h1>
            <p className="text-primary-foreground/90 text-sm">
              {activeTour.subtitle}
            </p>
          </div>

          {/* Tour stops */}
          <div className="space-y-3">
            {activeTour.stops.map((stop, index) => (
              <button
                key={stop.objectId}
                onClick={() => goToStop(index)}
                className={`w-full bg-card rounded-xl p-4 border transition-all text-left flex items-start gap-4 ${
                  index === currentStopIndex
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    index < currentStopIndex
                      ? "bg-primary text-primary-foreground"
                      : index === currentStopIndex
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStopIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-foreground">
                    {getObjectTitle(stop.objectId)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stop.highlight}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-2" />
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Parcours Guidés
          </h1>
          <p className="text-muted-foreground">
            Choisissez un parcours thématique pour découvrir la collection selon vos
            centres d'intérêt.
          </p>
        </div>

        {/* Tours list */}
        <div className="space-y-4">
          {guidedTours.map((tour) => {
            const Icon = iconMap[tour.icon] || Compass;
            return (
              <div
                key={tour.id}
                className="bg-card rounded-xl border border-border overflow-hidden shadow-md"
              >
                {/* Tour header */}
                <div
                  className={`bg-gradient-to-r ${tour.color} p-4 text-primary-foreground`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg">
                        {tour.title}
                      </h2>
                      <p className="text-primary-foreground/80 text-sm">
                        {tour.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tour content */}
                <div className="p-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </span>
                      <span>{tour.stops.length} étapes</span>
                    </div>

                    <Button onClick={() => startTour(tour)} size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Commencer
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GuidedTours;
