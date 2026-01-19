import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "ancestor";
  content: string;
}

interface AncestorChatProps {
  ancestorName: string;
  greeting: string;
}

export const AncestorChat = ({ ancestorName, greeting }: AncestorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ancestor", content: greeting }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in production, this would call an AI API)
    setTimeout(() => {
      const responses = [
        "Les anciens disaient que la sagesse vient à ceux qui savent écouter le silence entre les mots.",
        "Cette tradition remonte à nos aïeux qui, sous l'arbre à palabres, partageaient leur connaissance.",
        "Le patrimoine que tu contemples est le fruit de générations de maîtres artisans.",
        "Chaque objet porte en lui l'âme de celui qui l'a créé et les prières de ceux qui l'ont vénéré.",
        "La mémoire de notre peuple vit dans ces objets sacrés. Ils sont les témoins silencieux de notre histoire."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "ancestor", content: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="bg-primary/10 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-bold text-foreground">
            Posez une question à l'ancêtre
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{ancestorName}</p>
      </div>

      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground border border-primary/20"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-accent text-accent-foreground border border-primary/20 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" variant="ancestor" size="icon" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
