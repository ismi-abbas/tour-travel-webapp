import Navbar from "../../components/Navbar";
import Hero from "./landing_components/hero";
import Places from "./landing_components/places";

const LandingPage = () => {
  return (
    <div>
      <div className="w-11/12 2xl:w-4/5 m-auto">
        <Navbar />
        <Hero />
        <Places />
      </div>
    </div>
  );
};

export default LandingPage;
