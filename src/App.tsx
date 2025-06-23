
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
import WindConstructionCertificationDashboard from "./pages/WindConstructionCertificationDashboard";
import WindCommissioningCertificationDashboard from "./pages/WindCommissioningCertificationDashboard";
import WindCPCertificationDashboard from "./pages/WindCPCertificationDashboard";
import ProjectControlsDashboard from "./pages/ProjectControlsDashboard";
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
              {/* Certification Quiz Routes - No Authentication Required */}
              <Route path="/solar-planning" element={<PlanningSolarDashboard />} />
              <Route path="/solar-predevelopment" element={<SolarPredevelopmentDashboard />} />
              <Route path="/solar-engineering" element={<SolarEngineeringDashboard />} />
              <Route path="/solar-contracting" element={<SolarContractingDashboard />} />
              <Route path="/solar-construction" element={<SolarConstructionDashboard />} />
              <Route path="/solar-commissioning" element={<SolarCommissioningDashboard />} />
              <Route path="/wind-planning" element={<WindPlanningDashboard />} />
              <Route path="/wind-predevelopment" element={<WindPredevelopmentDashboard />} />
              <Route path="/wind-engineering" element={<WindEngineeringDashboard />} />
              <Route path="/wind-cp" element={<WindCPCertificationDashboard />} />
              <Route path="/wind-construction" element={<WindConstructionCertificationDashboard />} />
              <Route path="/wind-commissioning" element={<WindCommissioningCertificationDashboard />} />
              <Route path="/project-controls" element={<ProjectControlsDashboard />} />
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
