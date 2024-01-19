import LoggedNavbar from "../../components/Logged_Navbar";
import Hero from "./landing_components/hero";
import Places from "./landing_components/places";

const HomePage = () => {
  return (
    <div>
      <LoggedNavbar />
      <div className="w-11/12 2xl:w-4/5 m-auto">
        <Hero />
        <Places />
      </div>
    </div>
  );
};

export default HomePage;
