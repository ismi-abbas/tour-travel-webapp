import { Link } from "react-router-dom";
import SignUpForm from "./frm_signup";

function SignUp() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold hover:cursor-pointer">
          <Link to="/">Smart Tourist Guide Planner</Link>
        </h1>
      </div>
      <div className="mt-8">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
