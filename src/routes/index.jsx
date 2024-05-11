import { createFileRoute } from "@tanstack/react-router";
import Hero from "../pages/Home/landing_components/hero";
import Places from "../pages/Home/landing_components/places";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Places />
    </>
  );
}
