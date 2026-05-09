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
    <div className="min-h-screen bg-background bg-aurora">
      {showHeader && <Header />}
      <main className="animate-fade-in">{children}</main>
      {showBottomNav && <BottomNav />}
      <InstallPrompt />
    </div>
  );
};
