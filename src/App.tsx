import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "@/assets/logo-dalton-lab.png";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Newton = lazy(() => import("./pages/Newton"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Page loader with logo and smooth animation
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 animate-fade-in">
    <img 
      src={logo} 
      alt="Dalton Lab" 
      className="h-12 md:h-16 animate-pulse"
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/newton" element={<Newton />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
