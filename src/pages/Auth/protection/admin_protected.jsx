import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../../../hooks/get_user_data";

export default function AdminProtected({ children }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      const userData = await getUserData(currentUser.uid);
      if (userData.roles.includes("admin")) {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (location.pathname === "/admin" && currentUser && isAdmin) {
    return <Navigate to="/admin/home/" replace />;
  } else if (!currentUser || !isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
