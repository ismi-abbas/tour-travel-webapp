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
import { BackgroundDots } from "../components/BackgroundDots";

export const Route = createRootRoute({
  component: Root,
});

const links = [
  {
    to: "/",
    label: "Home",
    isProtected: false,
    showForAdmin: true,
  },
  {
    to: "/catalog",
    label: "Catalog",
    isProtected: false,
    showForAdmin: true,
  },
  {
    to: "/planner",
    label: "Planner",
    isProtected: true,
    showForAdmin: false,
  },
  {
    to: "/contact",
    label: "Contact",
    isProtected: false,
    showForAdmin: false,
  },
  {
    to: "/about",
    label: "About",
    isProtected: false,
    showForAdmin: false,
  },
];

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { pathname } = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (!session) {
        return;
      }

      supabase
        .from("role")
        .select("role")
        .eq("user_id", session.user.id)
        .single()
        .then(({ data: { role } }) => {
          setRole(role);
        });
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

  const protectedNavbar = links.filter((link) => link.isProtected);
  const adminNavbar = links.filter((link) => link.showForAdmin);

  const navbar = role === "admin" ? adminNavbar : protectedNavbar;

  return (
    <nav className="flex justify-between items-center">
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
        {session &&
          navbar.map((link, index) => {
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
      </ul>
      {!session ? (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="px-5 py-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
          >
            <Link to="/sign-in">Sign In</Link>
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
          >
            <Link to="/sign-up">Sign up</Link>
          </button>
        </div>
      ) : (
        <div className="gap-2 flex">
          <Link
            to="/profile"
            className="px-5 py-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
          >
            Profile
          </Link>
          <button
            type="button"
            className="px-5 py-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <BackgroundDots />
        <Outlet />
        <Toaster />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
