import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ParallaxImage = ({ src, alt, className = "" }: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollPercent = Math.max(0, Math.min(1, -rect.top / rect.height + 0.5));
        setScrollY(scrollPercent * 50); // Max 50px parallax
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover animate-zoom-slow"
        style={{
          transform: `translateY(-${scrollY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
    </div>
  );
};
