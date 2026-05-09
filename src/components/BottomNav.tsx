import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, Building2, Leaf, Info, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { QRScanner } from "./QRScanner";
import { heritageObjects } from "@/data/heritageObjects";
import { toast } from "sonner";

const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/maisons-patrimoine", label: "Maisons", icon: Building2 },
  { path: "/jardin-botanique", label: "Jardin", icon: Leaf },
  { path: "/a-propos", label: "À propos", icon: Info },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleScan = (result: string) => {
    setShowScanner(false);
    let id = result;
    if (result.includes("/objet/")) id = result.split("/objet/").pop()!.replace(/\/$/, "");
    const obj = heritageObjects.find(o => o.id === id);
    if (obj) {
      toast.success(`Objet trouvé : ${obj.title}`);
      navigate(`/objet/${id}`);
    } else {
      toast.error("QR code non reconnu.");
    }
  };

  // Distribute items: 2 left, FAB center, 2 right
  const left = navItems.slice(0, 2);
  const right = navItems.slice(2);

  return (
    <>
      {showScanner && <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />}

      <div className="h-20 md:hidden" />

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/60 md:hidden safe-area-bottom">
        <div className="grid grid-cols-5 items-center h-16 px-1 relative">
          {left.map((item) => <NavBtn key={item.path} item={item} active={isActive(item.path)} />)}

          {/* Central FAB - QR scan */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowScanner(true)}
              aria-label="Scanner un QR code"
              className="w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-xl shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform animate-glow-pulse touch-target"
            >
              <QrCode className="w-6 h-6" />
            </button>
          </div>

          {right.map((item) => <NavBtn key={item.path} item={item} active={isActive(item.path)} />)}
        </div>
      </nav>
    </>
  );
};

const NavBtn = ({ item, active }: { item: typeof navItems[0]; active: boolean }) => (
  <Link
    to={item.path}
    aria-label={item.label}
    className={cn(
      "flex flex-col items-center justify-center gap-0.5 py-2 px-1 transition-all duration-200 touch-target",
      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
    )}
  >
    <item.icon className={cn("w-5 h-5 transition-transform", active && "scale-125")} />
    <span className="text-[10px] font-medium">{item.label}</span>
    <span className={cn(
      "w-1 h-1 rounded-full bg-primary transition-opacity",
      active ? "opacity-100" : "opacity-0"
    )} />
  </Link>
);
