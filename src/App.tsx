import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import dBranco from "@/assets/d-branco.png";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Produto = lazy(() => import("./pages/Produto"));
const FaleComDalton = lazy(() => import("./pages/FaleComDalton"));
const Newton = lazy(() => import("./pages/Newton"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Component to track page views on route change
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Get page title from document or use path
    const pageTitle = document.title || location.pathname;
    trackPageView(location.pathname, pageTitle);
  }, [location.pathname]);

  return null;
};

// Page loader with logo and smooth animation
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 animate-fade-in">
    <img 
      src={dBranco} 
      alt="Dalton Lab" 
      className="h-16 md:h-24 animate-pulse"
    />
    <div className="w-8 h-8 border-2 border-dalton-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageViewTracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/fale-com-o-dalton" element={<FaleComDalton />} />
            <Route path="/newton" element={<Newton />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
