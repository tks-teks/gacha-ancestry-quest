import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import HeritageObject from "./pages/HeritageObject";
import About from "./pages/About";
import QRCodes from "./pages/QRCodes";
import HeritageHouses from "./pages/HeritageHouses";
import BotanicalGarden from "./pages/BotanicalGarden";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/objet/:id" element={<HeritageObject />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/qr-codes" element={<QRCodes />} />
        <Route path="/maisons-patrimoine" element={<HeritageHouses />} />
        <Route path="/jardin-botanique" element={<BotanicalGarden />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
