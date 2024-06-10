import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import supabase from "../../lib/supabase";

export const Route = createFileRoute("/(admin)/_admin")({
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      const { data: role, error: roleError } = await supabase
        .from("role")
        .select("")
        .eq("id", data.session.user.id)
        .single();

      console.log(data);

      if (error) {
        return {
          session: null,
        };
      }

      return {
        session: data,
      };
    } catch (error) {
      throw new Error("Failed to load session");
    }
  },
  component: Component,
});

function Component() {
  const { session } = Route.useRouteContext();

  if (!session) {
    Navigate({ to: "/sign-in/admin" });
  }

  return <Outlet />;
}
