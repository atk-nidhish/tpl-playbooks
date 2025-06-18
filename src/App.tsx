
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Playbook from "./pages/Playbook";
import CommissioningDashboard from "./pages/CommissioningDashboard";
import WindCPDashboard from "./pages/WindCPDashboard";
import PlanningSolarDashboard from "./pages/PlanningSolarDashboard";
import WindPlanningDashboard from "./pages/WindPlanningDashboard";
import SolarEngineeringDashboard from "./pages/SolarEngineeringDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/legacy" element={<Index />} />
          {/* <Route 
            path="/commissioning" 
            element={
              <ProtectedRoute>
                <CommissioningDashboard />
              </ProtectedRoute>
            } 
          /> */}
          <Route 
            path="/wind-cp" 
            element={
              <ProtectedRoute>
                <WindCPDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wind-planning" 
            element={
              <ProtectedRoute>
                <WindPlanningDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/solar-planning" 
            element={
              <ProtectedRoute>
                <PlanningSolarDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/solar-engineering" 
            element={
              <ProtectedRoute>
                <SolarEngineeringDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/playbook/:id" 
            element={
              <ProtectedRoute>
                <Playbook />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
