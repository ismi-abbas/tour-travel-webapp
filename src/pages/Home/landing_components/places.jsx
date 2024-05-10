import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { getAttractions } from "../../../services/query";
import { Link } from "@tanstack/react-router";

const Places = () => {
  const [places, setPlaces] = useState({});

  async function fetchPlaces() {
    const allPlaces = {};
    const pahangList = await getAttractions("Pahang");
    const kelantanList = await getAttractions("Kelantan");
    const terengganuList = await getAttractions("Terengganu");

    allPlaces["pahang"] = pahangList;
    allPlaces["terengganu"] = terengganuList;
    allPlaces["kelantan"] = kelantanList;

    setPlaces(allPlaces);
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Popular Places</h1>
        <Link
          to="/all-attractions"
          className="px-5 py-2 rounded border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
        >
          View All
        </Link>
      </div>
      {/* Place state sections dynamically based on fetched data */}
      {Object.keys(places).map((state) => (
        <div key={state} className="mb-10">
          <h2 className="text-2xl font-bold capitalize mb-4">{state}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {places[state].length > 0 ? (
              places[state].map((place) => (
                <Link
                  to={`/details/attractions/${place.id}`}
                  key={place.id}
                  className="place w-full bg-white border rounded-lg overflow-hidden hover:cursor-pointer hover:ring-2 hover:ring-indigo-600"
                >
                  <div className="h-[150px] md:h-[230px] overflow-hidden">
                    <img
                      src={
                        place.image !== ""
                          ? place.image
                          : "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold mb-2 w-full">
                      {place.name}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="flex items-center space-x-2 text-yellow-500">
                        <AiFillStar />
                        <span>{place.rating}</span>
                      </p>
                    </div>
                    <p className="flex items-center justify-start space-x-2 text-gray-500 h-4">
                      <IoLocationOutline />
                      <span className="text-start overflow-hidden truncate">
                        {place.address}
                      </span>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="places flex flex-col items-center">
                <p className="text-center">No Places Found</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;
