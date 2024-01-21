import { Link } from "react-router-dom";
import SignInForm from "./frm_signin";

function SignIn() {
  return (
    <div className="flex justify-start h-screen w-full flex-col">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold hover:cursor-pointer">
          <Link to="/">Smart Tourist Guide Planner</Link>
        </h1>
      </div>
      <div className="mt-8">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
