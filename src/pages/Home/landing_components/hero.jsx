import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Hero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("place") || ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ place: searchQuery });
    navigate(`/search?place=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="py-10">
      <div className="w-full h-[500px] rounded-md bg-[url('https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover">
        <div className="w-full md:4/5 lg:w-1/2 2xl:w-1/3 bg-gradient-to-r from-gray-600 h-full flex flex-col justify-center space-y-5 p-5 text-white rounded-md">
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore the best holiday location!
          </h1>
          <p className="text-sm md:text-base">
            Embark on an extraordinary journey with our exclusive travel tours,
            meticulously crafted to indulge your wanderlust and create
            unforgettable experiences. Our tours promise a seamless blend of
            adventure, culture, and relaxation, curated to suit every
            traveler&apos;s desires.
          </p>
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              className="px-5 py-2 bg-white rounded-md-1 text-gray-500 outline-0"
              type="text"
              placeholder="search place"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 font-bold rounded-r-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
