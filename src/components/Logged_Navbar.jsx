import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

const LoggedNavbar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  function LinkComponent({ location, locationName }) {
    return (
      <Link
        to={location}
        className="hover:border-b border-orange-500 hover:cursor-pointer"
      >
        {locationName}
      </Link>
    );
  }

  return (
    <div className="p-5 flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Home</h1>
      <ul className="hidden md:flex space-x-8">
        <LinkComponent location="/home" locationName="Home" />
        <LinkComponent location="/tour-catalog" locationName="Tour Catalog" />
        <LinkComponent location="/plan" locationName="Plan Your Trip" />
        <LinkComponent location="/about" locationName="About us" />
        <LinkComponent location="/contact" locationName="Contact" />
      </ul>
      <div className="flex items-center space-x-5">
        <button
          className="px-5 py-2 rounded bg-gray-100 hover:bg-red-500"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default LoggedNavbar;
