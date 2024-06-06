import { createFileRoute } from "@tanstack/react-router";
import Places from "./-places";
import Hero from "./-hero";

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
