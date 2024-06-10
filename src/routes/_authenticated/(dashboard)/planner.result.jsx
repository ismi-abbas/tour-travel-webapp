import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import supabase from "../../../lib/supabase.js";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";

export const Route = createFileRoute(
  "/_authenticated/(dashboard)/planner/result",
)({
  component: RecommenderResult,
});

function RecommenderResult() {
  const criteria = Route.useSearch();

  let rating = [];
  if (criteria.rating === "low") {
    rating = [0.0, 2.9];
  } else if (criteria.rating === "high") {
    rating = [3.0, 3.9];
  } else {
    rating = [4.0, 5];
  }

  const { data, error } = useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("places")
        .select()
        .ilike("state", criteria.state)
        .ilike("city", criteria.district);
      // .ilike("rating", rating);

      if (error) {
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="mt-4">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl">Recommended Trips</h1>

        <p>
          Here are some places that we recommend based on your preferences.
          <span>
            <Link
              to="/planner"
              className="underline underline-offset-1 ml-2 decoration-orange-500 text-orange-500"
            >
              Back
            </Link>
          </span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data &&
          data.map((place) => (
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
    </div>
  );
}
