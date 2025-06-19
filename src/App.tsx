
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Playbook from "./pages/Playbook";
import PlanningSolarDashboard from "./pages/PlanningSolarDashboard";
import SolarPredevelopmentDashboard from "./pages/SolarPredevelopmentDashboard";
import SolarEngineeringDashboard from "./pages/SolarEngineeringDashboard";
import SolarContractingDashboard from "./pages/SolarContractingDashboard";
import SolarConstructionDashboard from "./pages/SolarConstructionDashboard";
import SolarCommissioningDashboard from "./pages/SolarCommissioningDashboard";
import WindPlanningDashboard from "./pages/WindPlanningDashboard";
import WindPredevelopmentDashboard from "./pages/WindPredevelopmentDashboard";
import WindEngineeringDashboard from "./pages/WindEngineeringDashboard";
import WindCPDashboard from "./pages/WindCPDashboard";
import WindCPCertificationDashboard from "./pages/WindCPCertificationDashboard";
import CommissioningDashboard from "./pages/CommissioningDashboard";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/solar-planning" element={
                <ProtectedRoute>
                  <PlanningSolarDashboard />
                </ProtectedRoute>
              } />
              <Route path="/solar-predevelopment" element={
                <ProtectedRoute>
                  <SolarPredevelopmentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/solar-engineering" element={
                <ProtectedRoute>
                  <SolarEngineeringDashboard />
                </ProtectedRoute>
              } />
              <Route path="/solar-contracting" element={
                <ProtectedRoute>
                  <SolarContractingDashboard />
                </ProtectedRoute>
              } />
              <Route path="/solar-construction" element={
                <ProtectedRoute>
                  <SolarConstructionDashboard />
                </ProtectedRoute>
              } />
              <Route path="/solar-commissioning" element={
                <ProtectedRoute>
                  <SolarCommissioningDashboard />
                </ProtectedRoute>
              } />
              <Route path="/wind-planning" element={
                <ProtectedRoute>
                  <WindPlanningDashboard />
                </ProtectedRoute>
              } />
              <Route path="/wind-predevelopment" element={
                <ProtectedRoute>
                  <WindPredevelopmentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/wind-engineering" element={
                <ProtectedRoute>
                  <WindEngineeringDashboard />
                </ProtectedRoute>
              } />
              <Route path="/wind-cp-dashboard" element={
                <ProtectedRoute>
                  <WindCPDashboard />
                </ProtectedRoute>
              } />
              <Route path="/wind-cp" element={
                <ProtectedRoute>
                  <WindCPCertificationDashboard />
                </ProtectedRoute>
              } />
              <Route path="/commissioning" element={
                <ProtectedRoute>
                  <CommissioningDashboard />
                </ProtectedRoute>
              } />
              <Route path="/playbook/:id" element={
                <ProtectedRoute>
                  <Playbook />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
