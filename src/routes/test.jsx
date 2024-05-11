import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: () => (
    <div>
      H<Link to="/">Home</Link>
    </div>
  ),
});
