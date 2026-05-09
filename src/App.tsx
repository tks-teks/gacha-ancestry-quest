import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLoader } from "@/components/PageLoader";
import Index from "./pages/Index";

const HeritageObject = lazy(() => import("./pages/HeritageObject"));
const About = lazy(() => import("./pages/About"));
const QRCodes = lazy(() => import("./pages/QRCodes"));
const HeritageHouses = lazy(() => import("./pages/HeritageHouses"));
const BotanicalGarden = lazy(() => import("./pages/BotanicalGarden"));
const Brochure = lazy(() => import("./pages/Brochure"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/objet/:id" element={<HeritageObject />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/qr-codes" element={<QRCodes />} />
          <Route path="/maisons-patrimoine" element={<HeritageHouses />} />
          <Route path="/jardin-botanique" element={<BotanicalGarden />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
