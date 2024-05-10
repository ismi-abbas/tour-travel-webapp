import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900">
          About Smart Tourist Guide Planner
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Welcome to Smart Tourist Guide Planner, your go-to platform for an
          enhanced travel experience. We are committed to providing you with the
          best tools and information to make your journey memorable.
        </p>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          At Smart Tourist Guide Planner, we understand that every traveler is
          unique, and so are their preferences. Whether you&apos;re an adventure
          seeker, a history enthusiast, or someone who loves to explore local
          cuisines, our platform is designed to cater to your specific
          interests.
        </p>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Explore our user-friendly features that help you plan your trip with
          ease. From personalized itineraries to real-time updates on
          attractions and events, Smart Tourist Guide Planner is your companion
          throughout your journey.
        </p>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Have a technical issue, want to send feedback, or need details about
          our Business plan? Let us know; we value your input and are dedicated
          to continually improving your experience with our platform.
        </p>
      </div>
    </section>
  );
}
