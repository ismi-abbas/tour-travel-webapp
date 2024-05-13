import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

export function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    navigate({
      to: "/planner",
      state: {
        user: data.user,
      },
    });
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex w-full items-center justify-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2">
          <img
            alt=""
            src="https://images.pexels.com/photos/3931548/pexels-photo-3931548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>

        <div className="w-full  px-6 py-20 md:px-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-gray-700 ">
            Travelling start here.
          </h2>

          <p className="text-xl text-center text-gray-600 ">Sign In now.</p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4" />

            <p className="text-xs text-center text-gray-500 uppercase ">
              login with email
            </p>

            <span className="w-1/5 border-b  lg:w-1/4" />
          </div>

          <form onSubmit={handleSignIn}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Email Address
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                  Password
                </label>
              </div>

              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide border border-black border-solid hover:bg-blue-900 overflow-hidden  hover:text-white"
              >
                <h2 className="relative z-20">Sign In</h2>
              </button>
            </div>
            <div className="mt-4 ">
              <p className="text-center">
                Don&apos;t have an account?
                <Link to="/signup" className="text-blue-700">
                  Sign up Here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
