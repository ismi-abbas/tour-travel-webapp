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

    await navigate({
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
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>

            <div className="mt-8 flex gap-2 flex-col">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide border border-black border-solid hover:bg-blue-900 overflow-hidden  hover:text-white"
              >
                <h2 className="relative z-20">Sign In</h2>
              </button>

              <button
                type="button"
                onClick={() =>
                  supabase.auth.signInWithOAuth({ provider: "google" })
                }
                className="w-full px-4 py-2 tracking-wide border border-black border-solid hover:bg-blue-900 overflow-hidden  hover:text-white"
              >
                <h2 className="flex items-center justify-center gap-4">
                  Sign In With Google
                  <span className="size-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </span>
                </h2>
              </button>
            </div>
            <div className="mt-4 ">
              <p className="text-center">
                Don&apos;t have an account? &nbsp;
                <span>
                  <Link to="/signup" className="text-blue-700">
                    Sign up Here!
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
