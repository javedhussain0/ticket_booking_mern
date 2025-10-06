import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>; // spinner bhi laga sakte ho
  if (!user) return <Navigate to="/auth" />; // agar user nahi hai → login page bhejo

  return children;
};

export default ProtectedRoute;
