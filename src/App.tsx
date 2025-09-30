
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrimeirosSocorros from "./pages/PrimeirosSocorros";
import EmergencyGuide from "./pages/EmergencyGuide";
import Quiz from "./pages/Quiz";
import Simulador from "./pages/Simulador";
import Sobre from "./pages/Sobre";
import ModoRapido from "./pages/ModoRapido";
import SocorroIA from "./pages/SocorroIA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/primeiros-socorros" element={<PrimeirosSocorros />} />
          <Route path="/emergencia" element={<EmergencyGuide />} />
          <Route path="/emergencia/:situacao" element={<EmergencyGuide />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/modo-rapido" element={<ModoRapido />} />
          <Route path="/socorro-ia" element={<SocorroIA />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
