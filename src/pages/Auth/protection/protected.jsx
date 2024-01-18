import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function Protected({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (location.pathname === "/" && currentUser) {
    return <Navigate to="/home" replace />;
  } else if (!currentUser) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}
