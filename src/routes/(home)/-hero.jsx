import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    await navigate({
      to: "/catalog",
      search: { place: searchQuery },
    });
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
          <form
            className="flex items-center justify-between border"
            onSubmit={handleSearch}
          >
            <input
              className="px-5 py-2 bg-white text-gray-500 outline-0 w-full"
              type="text"
              placeholder="search place"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <span className="bg-orange-500 font-bold px-5 py-2 outline-0">
              <Link
                to="/catalog/search"
                search={{ place: searchQuery }}
                type="button"
              >
                Search
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
