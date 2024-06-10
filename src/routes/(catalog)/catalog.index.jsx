import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import supabase from "../../lib/supabase.js";
import { states } from "../_authenticated/(dashboard)/planner.index.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/DropdownMenu.jsx";
import Sample from "./-sample.jsx";
import { cn } from "../../lib/utils.js";
import { useState } from "react";

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

export const Route = createFileRoute("/(catalog)/catalog/")({
  component: CatalogPage,
});

const categories = [
  {
    name: "Hotel",
    value: "hotel",
  },
  {
    name: "Restaurant",
    value: "restaurant",
  },
  {
    name: "Cafe",
    value: "cafe",
  },
  {
    name: "Historical",
    value: "historical",
  },
  {
    name: "Things To Do",
    value: "things_to_do",
  },
];

const district = [];

function StatesDropdown() {
  const [openDropdowns, setOpenDropdowns] = useState(
    Array(states.length).fill(false),
  );
  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => {
      const newOpenDropdowns = [...prev];
      newOpenDropdowns[index] = !newOpenDropdowns[index];
      return newOpenDropdowns;
    });
  };
  return (
    <div className="flex justify-end items-center">
      <div className="">
        {states.map(({ name, value, district }, index) => (
          <div
            key={index}
            className="border px-4 py-1 relative hover:cursor-pointer hover:bg-orange-500 hover:text-white"
            onClick={() => toggleDropdown(index)}
          >
            {name}
            <span>
              <div
                className={cn("absolute bg-orange-500 text-white z-10", {
                  block: openDropdowns[index],
                  hidden: !openDropdowns[index],
                })}
                onClick={() => console.log(value)}
                key={index}
              >
                {district.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogPage() {
  const { data, isError } = useSuspenseQuery(catalogQueryOptions());

  return (
    <div className="container">
      <div className="flex w-full justify-between px-20 py-2 mt-4">
        {categories.map(({ name, value }, index) => (
          <button
            onClick={() => console.log(value)}
            key={index}
            className="bg-white px-4 py-2 rounded-md outline outline-orange-500 hover:bg-orange-500 hover:text-white"
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center h-full mt-4">
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
