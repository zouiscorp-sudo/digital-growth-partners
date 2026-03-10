import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminServices from "./pages/admin/AdminServices";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminPortfolio from "./pages/admin/AdminPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLeads />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminReviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/portfolio"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPortfolio />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
