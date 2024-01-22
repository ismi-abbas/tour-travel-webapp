import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import hotelData from "../../../hotel_datasets.json";
import attractionData from "../../../attractions.json";
import restaurantData from "../../../restauran_datasets.json";
import { useMemo } from "react";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const allData = useMemo(() => {
    return [...hotelData, ...attractionData, ...restaurantData];
  });

  const place = searchParams.get("place");

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("place") || ""
  );
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = () => {
    const searchTerm = place.toLowerCase().trim();

    const getProperty = (obj, path) => {
      const properties = path.split(".");
      return properties.reduce(
        (acc, prop) => (acc && acc[prop] ? acc[prop] : undefined),
        obj
      );
    };

    let result = allData.filter((item) => {
      return [
        "name",
        "address",
        "category",
        "description",
        "addressObj.state",
      ].some((property) => {
        const propertyValue = getProperty(item, property);
        return (
          propertyValue && propertyValue.toLowerCase().includes(searchTerm)
        );
      });
    });

    setSearchResults(result);
  };

  useEffect(() => {
    // Fetch search results when the component mounts or when the search term changes
    fetchSearchResults();
  }, [place, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ place: searchQuery });
    navigate(`/search?place=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="w-full">
      <Navbar />
      <div>
        <h1>
          {searchResults.length}{" "}
          {searchResults.length <= 1 ? "result" : "results"} found for &quot;
          {place}&quot;
        </h1>

        <form
          className="flex items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="px-5 py-2 bg-white rounded-md text-gray-500 w-1/2 border"
            type="text"
            placeholder="search place"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-orange-500 font-bold rounded-md text-white"
          >
            Search
          </button>
        </form>
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
              )
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
              disabled={indexOfLastItem >= searchResults.length}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
