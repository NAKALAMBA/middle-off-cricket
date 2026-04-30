import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./auth";

export function useAdminGuard() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/admin/login" });
    } else if (!isAdmin) {
      navigate({ to: "/" });
    }
  }, [user, isAdmin, loading, navigate]);
  return { ready: !loading && !!user && isAdmin };
}
