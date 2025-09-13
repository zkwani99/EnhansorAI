import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import EnhancePage from "@/pages/enhance";
import GeneratePage from "@/pages/generate";
import VideoPage from "@/pages/video";
import ImageToVideoPage from "@/pages/image-to-video";
import APIPage from "@/pages/api";
import AboutPage from "@/pages/about";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import RefundPage from "@/pages/refund";
import PricingPage from "@/pages/pricing";
import DashboardPage from "@/pages/dashboard";
import BlogPage from "@/pages/blog";
import GuidesPage from "@/pages/guides";
import ApiDocsPage from "@/pages/api-docs";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/image-enhancement" component={EnhancePage} />
      <Route path="/text-to-image" component={GeneratePage} />
      <Route path="/text-to-video" component={VideoPage} />
      <Route path="/image-to-video" component={ImageToVideoPage} />
      <Route path="/api" component={APIPage} />
      <Route path="/About-Us" component={AboutPage} />
      <Route path="/Privacy-Policy" component={PrivacyPage} />
      <Route path="/Terms-of-Service" component={TermsPage} />
      <Route path="/Refund-Policy" component={RefundPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/guides" component={GuidesPage} />
      <Route path="/api-docs" component={ApiDocsPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
