import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import supabase from "../../../lib/supabase.js";
import { useEffect } from "react";

export const catalogQueryOptions = () =>
  queryOptions({
    queryKey: ["get-all-places"],
    queryFn: async () => {
      const { data, error } = await supabase.from("places").select();

      if (error) return error;

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const Route = createFileRoute("/_authenticated/(catalog)/catalog/")({
  component: CatalogPage,
});

function CatalogPage() {
  const { data, isError } = useSuspenseQuery(catalogQueryOptions());

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center h-full">
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
