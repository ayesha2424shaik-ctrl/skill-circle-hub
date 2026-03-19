import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { CommentProvider } from "@/context/CommentContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Sources from "./pages/Sources";
import SkillDetail from "./pages/SkillDetail";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Saved from "./pages/Saved";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/home" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    <Route path="/skill/:skillId" element={<ProtectedRoute><SkillDetail /></ProtectedRoute>} />
    <Route path="/quiz/:skillId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/sources" element={<ProtectedRoute><Sources /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <AuthProvider>
          <GamificationProvider>
            <BookmarkProvider>
              <CommentProvider>
                <NotificationProvider>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </NotificationProvider>
              </CommentProvider>
            </BookmarkProvider>
          </GamificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
