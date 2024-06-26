import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import supabase from "../../lib/supabase.js";
import { useQuery } from "@tanstack/react-query";

async function fetchPlaces() {
  const { data, error } = await supabase.from("places").select();

  if (error) return error;

  const pahang = data
    .filter((data) => data.state.toLowerCase() === "pahang")
    .slice(0, 8);
  const terengganu = data
    .filter((data) => data.state.toLowerCase() === "terengganu")
    .slice(0, 8);
  const kelantan = data
    .filter((data) => data.state.toLowerCase() === "kelantan")
    .slice(0, 8);

  return {
    kelantan: kelantan,
    pahang: pahang,
    terengganu: terengganu,
  };
}

export const useGetPlaces = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["get-places"],
    queryFn: fetchPlaces,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return {
    data,
    isError,
    isLoading,
  };
};

const Places = () => {
  const { data, isError } = useGetPlaces();

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Popular Places</h1>

        <Link
          to="/catalog"
          className="px-5 py-2 rounded border bg-white border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
        >
          View All
        </Link>
      </div>
      {isError ? (
        <div className="flex flex-1 justify-center">
          <h2 className="text-xl">Server Error</h2>
        </div>
      ) : (
        data &&
        Object.keys(data).map((state) => (
          <div key={state} className="mb-10">
            <h2 className="text-2xl font-semibold capitalize mb-4">{state}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data[state].length > 0 ? (
                data[state].map((place) => (
                  <Link
                    to={`/catalog/${place.id}`}
                    key={place.id}
                    className="place w-full bg-white border rounded-lg overflow-hidden hover:cursor-pointer hover:ring-1 hover:ring-orange-600"
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
        ))
      )}
    </div>
  );
};

export default Places;
