import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import InsectBackground from './components/InsectBackground';
import Login from './pages/Login';
import LibraryMap from './pages/LibraryMap';
import Admin from './pages/Admin';
import Profile from './pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children, adminOnly = false,
}) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/library" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/library" replace /> : <Login />} />
      <Route path="/library" element={<ProtectedRoute><LibraryMap /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Box position="relative" minH="100vh">
        <InsectBackground />
        <AppRoutes />
      </Box>
    </AuthProvider>
  );
}

export default App;
