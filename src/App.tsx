
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import EventsPage from "./pages/admin/EventsPage";
import EventForm from "./pages/admin/EventForm";
import CommentsPage from "./pages/admin/CommentsPage";
import SettingsPage from "./pages/admin/SettingsPage";
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
          <Route path="/events/:id" element={<EventPage />} />
          
          {/* Routes d'administration */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/create" element={<EventForm />} />
            <Route path="events/:id" element={<EventForm />} />
            <Route path="comments" element={<CommentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
