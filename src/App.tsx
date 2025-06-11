import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Playbook from "@/pages/Playbook";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import CommissioningDashboard from "@/pages/CommissioningDashboard";
import WindCPDashboard from "@/pages/WindCPDashboard";
import PlanningSolarDashboard from "@/pages/PlanningSolarDashboard";
import PlanningWindDashboard from "@/pages/PlanningWindDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/playbook/:id" element={<ProtectedRoute><Playbook /></ProtectedRoute>} />
          <Route path="/commissioning-dashboard" element={<ProtectedRoute><CommissioningDashboard /></ProtectedRoute>} />
          <Route path="/wind-cp-dashboard" element={<ProtectedRoute><WindCPDashboard /></ProtectedRoute>} />
          <Route path="/planning-solar-dashboard" element={<ProtectedRoute><PlanningSolarDashboard /></ProtectedRoute>} />
          <Route path="/planning-wind-dashboard" element={<ProtectedRoute><PlanningWindDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
