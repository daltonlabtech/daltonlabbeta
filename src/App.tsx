import { lazy, Suspense, useEffect, Component, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import { UpdateNotification } from "@/components/ui/UpdateNotification";

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

// ChunkErrorBoundary: catches ChunkLoadError after deploys and forces reload
const MAX_RELOAD_ATTEMPTS = 2;
const RELOAD_KEY = "chunk_reload_attempts";

class ChunkErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Failed to fetch dynamically imported module") ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Loading CSS chunk");

    if (isChunkError) {
      const attempts = parseInt(sessionStorage.getItem(RELOAD_KEY) || "0", 10);
      if (attempts < MAX_RELOAD_ATTEMPTS) {
        sessionStorage.setItem(RELOAD_KEY, String(attempts + 1));
        window.location.reload();
        return { hasError: true };
      }
    }
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8 text-center">
          <img src="/d-branco-loader.png" alt="Dalton Lab" className="h-16 w-16 md:h-24 md:w-24" />
          <p className="text-foreground/70 text-sm max-w-md">
            Ocorreu um erro ao carregar a página. Por favor, recarregue.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem(RELOAD_KEY);
              window.location.reload();
            }}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Component to track page views on route change
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = document.title || location.pathname;
    trackPageView(location.pathname, pageTitle);
    // Clear chunk reload counter on successful navigation
    sessionStorage.removeItem(RELOAD_KEY);
  }, [location.pathname]);

  return null;
};

// Page loader with logo and smooth animation
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 animate-fade-in">
    <img src="/d-branco-loader.png" alt="Dalton Lab" className="h-16 w-16 md:h-24 md:w-24 animate-pulse" />
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
        <ChunkErrorBoundary>
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
        </ChunkErrorBoundary>
        <UpdateNotification />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
