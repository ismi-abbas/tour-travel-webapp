import { useMemo } from "react";
import AuthenticatedLayout from "../AuthenticatedLayout";
import { Link, useLocation } from "react-router-dom";
import LocationDropdown from "./locationDropdown";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const CatalogPage = () => {
  const query = useQuery();

  const currentCat = query.get("category");

  const categories = ["restaurant", "cafe", "shopping", "historical", "hotel"];

  return (
    <AuthenticatedLayout>
      <div className="w-full">
        <div className="flex justify-end mb-8">
          <LocationDropdown />
        </div>
        <div className="flex justify-center">
          <ul className="flex justify-between w-full lg:mx-32 mx-48">
            {categories.map((cat) => (
              <Link
                className={`
                border p-2 rounded-lg capitalize w-32 hover:shadow-sm hover:cursor-pointer hover:ring-2 hover:ring-indigo-500
                ${
                  currentCat === cat
                    ? "text-indigo-700 ring-2 ring-indigo-500"
                    : "text-black"
                }`}
                key={cat}
                to={{
                  pathname: "/tour-catalog",
                  search: `?category=${cat}`,
                }}
              >
                <div className={""}>{cat}</div>
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
  const catalogData = [
    {
      name: "Tour 1",
      description: "Explore the beautiful beaches of Bali",
      rating: 4.5,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "hotel",
    },
    {
      name: "Tour 2",
      description: "Discover the cultural heritage of Kyoto",
      rating: 4.2,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "historical",
    },
    {
      name: "Tour 3",
      description: "Shop till you drop in Paris",
      rating: 4.8,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "cafe",
    },
    {
      name: "Tour 4",
      description: "Visit historical landmarks in Rome",
      rating: 4.7,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "restaurant",
    },
    {
      name: "Tour 5",
      description: "Relax in luxury at Maldives resorts",
      rating: 4.9,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "shopping",
    },
    {
      name: "Tour 6",
      description: "Explore the beautiful beaches of Bali",
      rating: 4.5,
      imgSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/84/49/db/photo1jpg.jpg?w=1200&h=-1&s=1",
      category: "hotel",
    },
  ];

  const filteredCatalog = category
    ? catalogData.filter((i) => i.category === category)
    : catalogData;

  return (
    <div className="mt-10 flex justify-center">
      <div className="grid grid-cols-1 gap-4">
        {filteredCatalog.map(({ name, description, imgSrc, rating }) => (
          <div
            key={name}
            className="flex border w-[700px] h-48 hover:shadow-md hover:cursor-pointer rounded-lg"
          >
            <div className="w-1/2 flex items-center">
              <img
                src={imgSrc}
                alt=""
                className="object-cover w-full h-full rounded-l-lg"
              />
            </div>
            <div className="w-2/3 p-4 flex flex-col items-start">
              <h1 className="text-lg font-semibold">{name}</h1>
              <p>{description}</p>
              <p>{rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
