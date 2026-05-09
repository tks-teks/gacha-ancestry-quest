import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, Grid3X3, Leaf, Building2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/maisons-patrimoine", label: "Maisons", icon: Building2 },
  { path: "/jardin-botanique", label: "Jardin", icon: Leaf },
  { path: "/a-propos", label: "À propos", icon: Info },
  { path: "/qr-codes", label: "QR Codes", icon: Grid3X3 },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/60 safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-primary-foreground font-serif font-bold text-sm">FG</span>
            </div>
            <span className="font-serif font-bold text-foreground text-sm hidden sm:block tracking-wider">
              Fondation Gacha
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isActive(item.path) && "bg-primary/15 text-primary"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
              className="text-muted-foreground hover:text-primary"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out glass-strong border-b border-border/60",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono-ui">
              Fondation Jean-Félicien Gacha
            </p>
            <p className="text-xs text-foreground/70">Patrimoine Vivant des Grassfields</p>
          </div>
          <nav className="flex flex-col p-3 gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-muted-foreground hover:text-foreground",
                    isActive(item.path) && "bg-primary/15 text-primary"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="h-14" />
    </>
  );
};
