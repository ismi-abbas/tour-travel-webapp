import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import supabase from "../lib/supabase";

export const Route = createFileRoute("/sign-up")({
  component: SignUp
});

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !name || !confirmPassword) {
      setError("Please enter all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
    }

    if (data) {
      return data.user;
    }

    await navigate({
      to: "/dashboard"
    });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="flex w-full items-center justify-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://images.pexels.com/photos/4993151/pexels-photo-4993151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>

        <div className="w-full  px-6 py-20 md:px-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-gray-700 ">
            Register your account.
          </h2>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase ">
              sign up credentials
            </p>

            <span className="w-1/5 border-b  lg:w-1/4"></span>
          </div>
          {error && (
            <div className="text-red-500 text-center py-2">{error}</div>
          )}

          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-center py-2">{error}</div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide border border-black border-solid hover:bg-blue-900 overflow-hidden  hover:text-white"
                onClick={handleSignUp}
              >
                <h2 className="relative z-20">Sign Up</h2>
              </button>
            </div>

            <div className="mt-4">
              <p className="text-center">
                Already have an account?
                <Link to="/signin" className="text-blue-700">
                  {" "}
                  Sign In Here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <div className="mt-8">
        <SignUpForm />
      </div>
    </div>
  );
}
