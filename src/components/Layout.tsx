import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { InstallPrompt } from "./InstallPrompt";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export const Layout = ({
  children,
  showHeader = true,
  showBottomNav = true,
}: LayoutProps) => {
  return (
    <div className="min-h-[100svh] bg-background bg-aurora overflow-x-hidden">
      {/* Floating ambient orbs */}
      <div className="orb orb-gold" aria-hidden="true" />
      <div className="orb orb-violet" aria-hidden="true" />
      <div className="orb orb-green" aria-hidden="true" />

      {showHeader && <Header />}
      <main role="main" className="animate-fade-in relative z-10">{children}</main>
      {showBottomNav && <BottomNav />}
      <InstallPrompt />
    </div>
  );
};
