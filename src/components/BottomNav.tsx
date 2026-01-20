import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Leaf, Info, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/maisons-patrimoine", label: "Maisons", icon: Building2 },
  { path: "/jardin-botanique", label: "Jardin", icon: Leaf },
  { path: "/a-propos", label: "À propos", icon: Info },
  { path: "/qr-codes", label: "QR", icon: Grid3X3 },
];

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Spacer */}
      <div className="h-16 md:hidden" />
      
      {/* Bottom Navigation - Mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-200",
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive(item.path) && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
