import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-5 flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Travel</h1>
      <ul className="hidden md:flex space-x-8">
        <li className="hover:border-b border-orange-500">Home</li>
        <li className="hover:border-b border-orange-500">Places</li>
        <li className="hover:border-b border-orange-500">About us</li>
        <li className="hover:border-b border-orange-500">Contact</li>
      </ul>
      <div className="flex items-center space-x-5">
        <button className="px-5 py-2 rounded bg-gray-100">
          <Link to="/signin">Sign In</Link>
        </button>
        <button className="px-5 py-2 rounded bg-gray-100">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
