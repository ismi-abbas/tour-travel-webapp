import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import LocationDropdown from "../../../components/locationDropdown";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/(catalog)/catalog")({
  component: CatalogPage,
});

function useQuery() {
  // const { search } = useLocation();
  // return useMemo(() => new URLSearchParams(search), [search]);
}

function CatalogList({ category, districtFilter }) {
  const concat = [...[], ...[], ...[]];

  const filteredCatalog = useMemo(() => {
    let result = concat;

    const isHistoricalCategory = category === "historical";
    const hasDistrictFilter = Boolean(districtFilter);

    if (isHistoricalCategory && hasDistrictFilter) {
      result = result.filter((item) => {
        const { ancestorLocations = [], subcategories = [] } = item;
        const isMuseum = subcategories.includes("Museums");
        const isMatchingDistrict = ancestorLocations.some(
          (location) =>
            location.name.replace(/\sDistrict$/, "")?.toLowerCase() ===
            decodeURIComponent(districtFilter.toLowerCase()),
        );

        return isMuseum && isMatchingDistrict;
      });
    } else if (hasDistrictFilter && !category) {
      result = result.filter((item) => {
        const ancestorLocations = item.ancestorLocations || [];
        return ancestorLocations.some(
          (location) =>
            location.name.replace(/\sDistrict$/, "")?.toLowerCase() ===
            decodeURIComponent(districtFilter.toLowerCase()),
        );
      });
    } else if (isHistoricalCategory) {
      result = result.filter((item) => item.subcategories.includes("Museums"));
    } else if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (hasDistrictFilter && category !== "historical") {
      result = result.filter((item) => {
        const ancestorLocations = item.ancestorLocations || [];
        return ancestorLocations.some(
          (location) =>
            location.name.replace(/\sDistrict$/, "")?.toLowerCase() ===
            decodeURIComponent(districtFilter.toLowerCase()),
        );
      });
    }

    if (!hasDistrictFilter && !category) {
      result = concat;
    }

    return result;
  }, [concat, category, districtFilter]);

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
        {currentItems.map(
          ({
            id,
            name,
            category: itemCategory,
            address,
            description,
            image,
            rating,
          }) => (
            <Link
              to={`/tour-catalog/details/${itemCategory}s/${id}`}
              key={id}
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
            </Link>
          ),
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          Previous Page
        </button>
        <button
          type="button"
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

function CatalogPage() {
  const categories = [
    {
      name: "restaurant",
      value: "restaurant",
      type: "restaurant",
    },
    {
      name: "cafe",
      value: "restaurant",
      type: "restaurant",
    },
    {
      name: "things to do",
      value: "attraction",
      type: "attraction",
    },
    {
      name: "historical",
      value: "historical",
      type: "attraction",
    },
    {
      name: "hotel",
      value: "hotel",
      type: "hotel",
    },
  ];

  const query = useQuery();
  const [currentSelectedCategory, setSelectedCategory] = useState();

  return (
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
              currentSelectedCategory === item.name
                ? "text-indigo-700 ring-2 ring-indigo-500"
                : "text-black"
            }`}
              key={item.name}
              to={{
                pathname: "/tour-catalog",
                search: `?category=${item.value}`,
              }}
              onClick={() => setSelectedCategory(item.name)}
            >
              <div className={""}>{item.name}</div>
            </Link>
          ))}
        </ul>
      </div>

      <CatalogList
        category={query.get("category")}
        districtFilter={query.get("filter")}
      />
    </div>
  );
}
