import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  text: string;
}

const SPEEDS = [0.75, 1, 1.25] as const;

export const AudioPlayer = ({ text }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Estimated duration (~150 words/min)
  const wordCount = text.trim().split(/\s+/).length;
  const estSeconds = Math.round((wordCount / (150 * rate)) * 60);
  const mm = Math.floor(estSeconds / 60).toString().padStart(2, "0");
  const ss = (estSeconds % 60).toString().padStart(2, "0");

  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  const togglePlay = () => {
    if (!("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR"; u.rate = rate; u.pitch = 1;
    u.volume = isMuted ? 0 : 1;
    u.onend = () => setIsPlaying(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(m => !m);
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); }
  };

  const cycleRate = () => {
    const idx = SPEEDS.indexOf(rate as typeof SPEEDS[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setRate(next);
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); }
  };

  return (
    <div className="glass-card rounded-2xl p-4 flex items-center gap-3 relative overflow-hidden">
      <Button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Lecture"}
        size="icon"
        className="w-14 h-14 rounded-full shrink-0 bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/40 hover:scale-105 transition-transform"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
      </Button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-serif font-bold text-foreground tracking-wide">Narration ancestrale</p>
        <div className="flex items-end gap-px h-6 mt-1" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={cn("wave-bar", !isPlaying && "opacity-30")}
              style={{
                animationDelay: `${(i % 8) * 0.08}s`,
                animationPlayState: isPlaying ? "running" : "paused",
                height: isPlaying ? undefined : `${4 + ((i * 13) % 18)}px`,
              }}
            />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground font-mono-ui mt-0.5">
          ~{mm}:{ss} • {rate}×
        </p>
      </div>

      <div className="flex flex-col gap-1 shrink-0">
        <Button
          onClick={cycleRate}
          aria-label={`Vitesse ${rate}x`}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Gauge className="w-4 h-4" />
        </Button>
        <Button
          onClick={toggleMute}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
