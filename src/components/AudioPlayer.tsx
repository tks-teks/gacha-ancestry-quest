import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  text: string;
}

export const AudioPlayer = ({ text }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsPlaying(false);
        
        if (isMuted) {
          utterance.volume = 0;
        }
        
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-card rounded-lg p-3 shadow-sm border border-border">
      <Button
        variant="ancestor"
        size="icon"
        onClick={togglePlay}
        className="shrink-0"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">Écouter la narration</p>
        <p className="text-xs text-muted-foreground">
          {isPlaying ? "En lecture..." : "Appuyez pour écouter"}
        </p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="shrink-0"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
    </div>
  );
};
