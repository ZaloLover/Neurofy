// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Updated import

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth state, show nothing or a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121212] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a78bfa]"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;