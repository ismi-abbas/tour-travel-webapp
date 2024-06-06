import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import supabase from "../lib/supabase";
import { Fragment, useEffect, useState } from "react";
import { cn } from "../lib/utils.js";

export const Route = createRootRoute({
  component: Root,
});

const links = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About us",
  },
  {
    to: "/contact",
    label: "Contact",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { pathname } = useLocation();

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
        className={cn(
          "text-2xl font-semibold hover:cursor-pointer flex flex-col items-start",
        )}
      >
        <span>Smart Tourist</span>
        <span>Guide Planner</span>
      </Link>
      <ul className="hidden md:flex space-x-8">
        {links.map((link, index) => {
          return (
            <Fragment key={index}>
              <Link
                to={link.to}
                className={cn(
                  "hover:cursor-pointer hover:border-b border-orange-500",
                  pathname === link.to && "border-b border-orange-500",
                )}
              >
                {link.label}
              </Link>
            </Fragment>
          );
        })}
        {session && (
          <Link
            to="/planner"
            className={cn(
              "hover:cursor-pointer hover:border-b border-orange-500",
              pathname === "/planner" && "border-b border-orange-500",
            )}
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
