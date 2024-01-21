import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-5 flex justify-between items-center">
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
      </ul>
      <div className="flex items-center space-x-5">
        <button type="button" className="px-5 py-2 rounded bg-gray-100">
          <Link to="/signin">Sign In</Link>
        </button>
        <button type="button" className="px-5 py-2 rounded bg-gray-100">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
