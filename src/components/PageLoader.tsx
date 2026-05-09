export const PageLoader = () => (
  <div className="min-h-[100svh] flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <p className="mt-6 text-lg font-serif tracking-widest text-primary">FG</p>
      <p className="text-xs text-muted-foreground mt-1 font-mono-ui">Chargement…</p>
    </div>
  </div>
);
