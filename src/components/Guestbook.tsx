import { useState, useEffect } from "react";
import { Heart, Sparkles, Lightbulb, Star, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GuestbookEntry {
  id: string;
  visitor_name: string;
  message: string;
  emotion: string;
  created_at: string;
}

interface GuestbookProps {
  objectId: string;
  objectTitle: string;
}

const emotions = [
  { id: "love", icon: Heart, label: "J'adore", color: "text-red-500" },
  { id: "amazed", icon: Sparkles, label: "Émerveillé", color: "text-amber-500" },
  { id: "thoughtful", icon: Lightbulb, label: "Pensif", color: "text-blue-500" },
  { id: "inspired", icon: Star, label: "Inspiré", color: "text-purple-500" },
  { id: "moved", icon: Heart, label: "Ému", color: "text-pink-500" },
];

export const Guestbook = ({ objectId, objectTitle }: GuestbookProps) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, [objectId]);

  const fetchEntries = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("guestbook_entries")
      .select("*")
      .eq("object_id", objectId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching guestbook entries:", error);
    } else {
      setEntries(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim() || !selectedEmotion) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("guestbook_entries").insert({
      object_id: objectId,
      visitor_name: name.trim(),
      message: message.trim(),
      emotion: selectedEmotion,
    });

    if (error) {
      console.error("Error adding guestbook entry:", error);
      toast.error("Erreur lors de l'envoi");
    } else {
      toast.success("Merci pour votre message !");
      setName("");
      setMessage("");
      setSelectedEmotion(null);
      setShowForm(false);
      fetchEntries();
    }
    setIsSubmitting(false);
  };

  const getEmotionIcon = (emotionId: string) => {
    const emotion = emotions.find((e) => e.id === emotionId);
    if (!emotion) return null;
    const Icon = emotion.icon;
    return <Icon className={`w-4 h-4 ${emotion.color}`} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-5 sm:p-6 border border-border">
      <h2 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-accent rounded-full" />
        Livre d'or
      </h2>

      {/* Add entry button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          className="w-full mb-4"
        >
          <Heart className="w-4 h-4 mr-2" />
          Laisser un message
        </Button>
      )}

      {/* Entry form */}
      {showForm && (
        <div className="bg-muted/50 rounded-lg p-4 mb-4 space-y-3 animate-fade-in">
          <Input
            placeholder="Votre prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
          <Textarea
            placeholder={`Partagez votre ressenti sur ${objectTitle}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
          />

          {/* Emotion picker */}
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => {
              const Icon = emotion.icon;
              return (
                <button
                  key={emotion.id}
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedEmotion === emotion.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:border-primary/50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      selectedEmotion === emotion.id
                        ? "text-primary-foreground"
                        : emotion.color
                    }`}
                  />
                  {emotion.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Entries list */}
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : entries.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm py-4">
          Soyez le premier à laisser un message !
        </p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-muted/30 rounded-lg p-3 border border-border/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getEmotionIcon(entry.emotion)}
                  <span className="font-medium text-sm text-foreground">
                    {entry.visitor_name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(entry.created_at)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{entry.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
