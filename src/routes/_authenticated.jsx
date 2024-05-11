import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import supabase from "../lib/supabase";

const Component = () => {
  const { session } = Route.useRouteContext();

  if (!session) {
    Navigate({ to: "/sign-in" });
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          session: null,
        };
      }

      return {
        session: data.session,
      };
    } catch (error) {
      throw new Error("Failed to load session");
    }
  },
  component: Component,
});
