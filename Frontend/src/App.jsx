import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import Landing from './pages/Landing';
import LeadForm from './pages/LeadForm';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/admin" replace /> : children;
};

export default function App() {
  const theme = useThemeStore((state) => state.theme);
  
  // Dynamic class mapping based on theme state
  const appThemeClasses = theme === 'dark' 
    ? 'bg-zinc-950 text-zinc-50' 
    : 'bg-zinc-50 text-zinc-900';

  return (
    <Router>
      <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${appThemeClasses}`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/form" element={<LeadForm />} />
            <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}