import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: Root,
});

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);

    navigate({ to: "/sign-in" });
  };

  return (
    <nav className="p-5 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-semibold hover:cursor-pointer flex flex-col items-start"
      >
        <span>Smart Tourist</span>
        <span>Guide Planner</span>
      </Link>
      <ul className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="hover:cursor-pointer hover:border-b border-orange-500"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:cursor-pointer hover:border-b border-orange-500"
        >
          About us
        </Link>
        <Link
          to="/contact"
          className="hover:cursor-pointer hover:border-b border-orange-500"
        >
          Contact
        </Link>
        {session && (
          <Link
            to="/planner"
            className="hover:cursor-pointer hover:border-b border-orange-500"
          >
            Planner
          </Link>
        )}
      </ul>
      {!session ? (
        <div className="flex items-center space-x-5">
          <button type="button" className="px-5 py-2 rounded bg-gray-100">
            <Link to="/sign-in">Sign In</Link>
          </button>
          <button type="button" className="px-5 py-2 rounded bg-gray-100">
            <Link to="/sign-up">Sign up</Link>
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="px-5 py-2 rounded bg-gray-100"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
function Root() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
        <Toaster />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
