import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold text-center">
        Ooops!! You may have gone the wrong way!
      </div>
      <Link
        to="/"
        className="mt-8 border p-2 rounded-md border-green-500 hover:bg-green-500 hover:border-white hover:text-white"
      >
        Return to Home
      </Link>
    </div>
  );
}
