import Navbar from "../../components/Navbar";
import Hero from "./landing_components/hero";
import Places from "./landing_components/places";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div>
          <Hero />
          <Places />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
