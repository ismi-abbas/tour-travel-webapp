import LoggedNavbar from "../../components/Logged_Navbar";
import Hero from "./landing_components/hero";
import Places from "./landing_components/places";

const HomePage = () => {
  return (
    <div>
      <LoggedNavbar />
      <div>
        <Hero />
        <Places />
      </div>
    </div>
  );
};

export default HomePage;
