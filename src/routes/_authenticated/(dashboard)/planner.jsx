import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/(dashboard)/planner")({
  component: Planner,
});

function Planner() {
  return <>Planner</>;
}
