import { useMemo, useState } from "react";
import AuthenticatedLayout from "../AuthenticatedLayout";
import { Link, useLocation } from "react-router-dom";
import LocationDropdown from "./locationDropdown";
import hotelData from "../../../Tripadvisor_dataset.json";
import restaurantData from "../../../restauran_datasets.json";
import attactionsData from "../../../attractions.json";
import { data } from "autoprefixer";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const CatalogPage = () => {
  const query = useQuery();

  const currentCat = query.get("category");

  const categories = [
    {
      name: "restaurant",
      value: "restaurant",
    },
    {
      name: "cafe",
      value: "cafe",
    },
    {
      name: "things to do",
      value: "attraction",
    },
    {
      name: "historical",
      value: "historical",
    },
    {
      name: "hotel",
      value: "hotel",
    },
  ];

  return (
    <AuthenticatedLayout>
      <div className="w-full">
        <div className="flex justify-end mb-8">
          <LocationDropdown />
        </div>
        <div className="flex justify-center">
          <ul className="flex justify-between w-full lg:mx-32 mx-48">
            {categories.map((item) => (
              <Link
                className={`
                border p-2 rounded-lg capitalize w-32 hover:shadow-sm hover:cursor-pointer hover:ring-2 hover:ring-indigo-500
                ${
                  currentCat === item.value
                    ? "text-indigo-700 ring-2 ring-indigo-500"
                    : "text-black"
                }`}
                key={item.name}
                to={{
                  pathname: "/tour-catalog",
                  search: `?category=${item.value}`,
                }}
              >
                <div className={""}>{item.name}</div>
              </Link>
            ))}
          </ul>
        </div>

        <CatalogList category={query.get("category")} />
      </div>
    </AuthenticatedLayout>
  );
};

function CatalogList({ category }) {
  const dataSets = useMemo(() => hotelData);
  const resturantDataSets = useMemo(() => restaurantData);
  const attractionDataSets = useMemo(() => attactionsData);

  const concat = [...dataSets, ...resturantDataSets, ...attractionDataSets];
  const filteredCatalog = category
    ? concat.filter((i) => i.category === category)
    : concat;

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCatalog.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-10 flex justify-center flex-col items-center">
      <div className="grid grid-cols-1 gap-4">
        {currentItems.map(({ name, address, description, image, rating }) => (
          <div
            key={name}
            className="flex border w-[700px] h-52 hover:shadow-md hover:cursor-pointer rounded-lg"
          >
            <div className="min-w-[250px] flex items-center w-1/5">
              <img
                src={image}
                alt=""
                className="object-cover w-full h-full rounded-l-lg"
              />
            </div>
            <div className="p-4 mt-2 gap-2 flex flex-col">
              <h1 className="text-lg font-semibold text-start">{name}</h1>
              <div className="w-full">
                <p className="overflow-clip truncate text-start max-w-[400px]">
                  {description}
                </p>
                <p className="text-ellipsis overflow-hidden inline-flex justify-start w-full max-w-[400px] text-justify">
                  {address}
                </p>
              </div>
              <p className="inline-flex justify-start w-full">{rating}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= filteredCatalog.length}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CatalogPage;
