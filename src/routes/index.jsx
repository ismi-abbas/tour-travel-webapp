import { createFileRoute, notFound } from "@tanstack/react-router";
import Hero from "../pages/home/landing_components/hero";
import Places from "../pages/home/landing_components/places";

export const Route = createFileRoute("/")({
  component: Home,
  notFoundComponent: notFound,
});

function Home() {
  return (
    <>
      <Hero />
      <Places />
    </>
  );
}
