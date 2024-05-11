import { createFileRoute } from "@tanstack/react-router";
import Places from "../../pages/home/landing_components/places";
import Hero from "../../pages/home/landing_components/hero";

export const Route = createFileRoute("/(home)/")({
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
