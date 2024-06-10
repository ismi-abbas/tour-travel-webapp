import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/_admin/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return <div>Hello /(admin)/admin/dashboard!</div>;
}
