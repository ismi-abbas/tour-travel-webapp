import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import supabase from "../../../lib/supabase";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";

export const Route = createFileRoute(
  "/_authenticated/(catalog)/catalog/search",
)({
  component: SearchResult,
});

export const catalogSearchQueryOptions = (place) =>
  queryOptions({
    queryKey: ["search-place", place],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .ilike("name", `%${place}%`);

      if (error) return error;
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

function SearchResult() {
  const { place } = Route.useSearch();
  const navigate = useNavigate();
  const { data, isError } = useSuspenseQuery(catalogSearchQueryOptions(place));

  const [searchQuery, setSearchQuery] = useState(place || "");

  const handleSubmit = () => {
    navigate({
      to: "/catalog/search",
      search: { place: searchQuery },
    });
  };

  return (
    <div className="container">
      <form className="flex items-center justify-center gap-4">
        <input
          className="px-5 py-2 bg-white rounded-md text-gray-500 w-1/2 border"
          type="text"
          placeholder="Find places"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-5 py-2 bg-orange-500 font-bold rounded-md text-white"
        >
          Search
        </button>
      </form>
      <div className="flex flex-col justify-center items-center h-full mt-6">
        {isError ? (
          <div className="flex flex-1 justify-center">
            <h2 className="text-xl">Server Error</h2>
          </div>
        ) : (
          data && (
            <div className="grid grid-cols-4 gap-4">
              {data.map((place) => (
                <Link
                  to="/catalog/$catalogId"
                  params={{ catalogId: place.id }}
                  key={place.id}
                  className="place w-full bg-white border rounded-lg overflow-hidden hover:cursor-pointer hover:ring-2 hover:ring-orange-600"
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
                    <h3 className="text-xl font-semibold mb-2 w-full truncate">
                      {place.name}
                    </h3>
                    {/* Details */}
                    <div className="flex justify-between mb-2 flex-1 flex-col">
                      <p className="flex items-center space-x-2 text-yellow-500">
                        <AiFillStar />
                        <span>{place.rating}</span>
                      </p>
                      <div className="flex items-center">
                        <div className="mr-2">
                          <IoLocationOutline />
                        </div>
                        <p className="text-start truncate">{place.address}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
