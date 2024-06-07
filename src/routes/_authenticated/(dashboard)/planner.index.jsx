import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ authenticated/(dashboard)/planner/")({
  component: PlanTour,
});

const states = [
  {
    name: "Terengganu",
    value: "terengganu",
    district: [
      { name: "Kuala Terengganu", value: "kuala terengganu" },
      { name: "Marang", value: "marang" },
      { name: "Kijal", value: "kijal" },
      { name: "Chukai", value: "chukai" },
      { name: "Dungun", value: "dungun" },
      { name: "Paka", value: "paka" },
      { name: "Kerteh", value: "kerteh" },
    ],
  },
  {
    name: "Pahang",
    value: "pahang",
    district: [
      { name: "Genting Highlands", value: "genting highlands" },
      { name: "Brinchang", value: "brinchang" },
      { name: "Tanah Rata", value: "tanah rata" },
      { name: "Janda Baik", value: "janda baik" },
      { name: "Temerloh", value: "temerloh" },
      { name: "Jerantut", value: "jerantut" },
      { name: "Raub", value: "raub" },
      { name: "Mentakab", value: "mentakab" },
      { name: "Kuala Tahan", value: "kuala tahan" },
      { name: "Kuala Rompin", value: "kuala rompin" },
      { name: "Bukit Tinggi", value: "bukit tinggi" },
      { name: "Bentong", value: "bentong" },
      { name: "Kuantan", value: "kuantan" },
      { name: "Cherating", value: "cherating" },
      { name: "Kampung Temiang", value: "kampung temiang" },
      { name: "Ringlet", value: "ringlet" },
    ],
  },
  {
    name: "Kelantan",
    value: "kelantan",
    district: [
      { name: "Kota Bharu", value: "kota bharu" },
      { name: "Tumpat", value: "tumpat" },
    ],
  },
];

const criterias = [
  {
    name: "State",
    value: "state",
    options: states.map((state) => ({
      name: state.name,
      value: state.value,
    })),
  },
  {
    name: "District",
    value: "district",
    options: [
      {
        name: "test",
        value: "test",
      },
    ],
  },
  {
    name: "Rating",
    value: "rating",
    options: [
      { name: "High Rated", value: "high" },
      { name: "Medium Rated", value: "middle" },
      { name: "Low Rated", value: "low" },
    ],
  },
  {
    name: "Distance",
    value: "distance",
    options: [
      { name: "Close", value: "close" },
      { name: "Far", value: "far" },
    ],
  },
  {
    name: "Price Range",
    value: "priceRange",
    options: [
      { name: "Cheap", value: "cheap" },
      { name: "Affordable", value: "affordable" },
      { name: "Pricey", value: "pricey" },
    ],
  },
];

export default function PlanTour() {
  const navigate = useNavigate();
  const [criteriaList, setCriteriaList] = useState(criterias);
  const [selectedState, setSelectedState] = useState("kelantan");
  const [selectedCriteria, setSelectedCriteria] = useState({
    state: criterias[0].options[0].value,
    district: states[0].district[0]?.value || "",
    rating: criterias[2].options[0].value,
    distance: criterias[3].options[0].value,
    priceRange: criterias[4].options[0].value,
  });

  useEffect(() => {
    const stateCriteria = criterias.find(
      (criteria) => criteria.value === "state",
    );
    const districtOptions =
      states.find((state) => state.value === selectedState)?.district || [];
    const districtCriteria = {
      name: "District",
      value: "district",
      options: districtOptions,
    };

    const newCriteriaList = [
      stateCriteria,
      districtCriteria,
      ...criterias.filter(
        (criteria) =>
          criteria.value !== "state" && criteria.value !== "district",
      ),
    ];

    setCriteriaList(newCriteriaList);

    setSelectedCriteria((prev) => ({
      ...prev,
      district: districtOptions[0]?.value || "",
    }));
  }, [selectedState]);

  const handleCriteriaChange = (value, criteria) => {
    if (criteria === "state") {
      setSelectedState(value);
    }
    setSelectedCriteria((prev) => ({
      ...prev,
      [criteria]: value,
    }));
  };

  useEffect(() => {
    console.log(selectedCriteria);
  }, [selectedCriteria]);

  return (
    <>
      <div className="h-20 flex flex-col mt-10">
        <h1 className="inline-flex text-3xl font-medium">Plan your tour</h1>

        <h3 className="inline-flex text-lg">Select the criteria</h3>
      </div>

      <div className="flex-1">
        <form action="">
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {criteriaList.map((criteria, index) => (
              <CriteriaField
                key={index}
                name={criteria.name}
                value={criteria.value}
                options={criteria.options}
                handleCriteriaChange={handleCriteriaChange}
              />
            ))}
          </div>
        </form>
      </div>

      <div className="flex w-full flex-col mt-4">
        <Link
          to="/planner/result"
          search={{
            state: selectedCriteria.state,
            district: selectedCriteria.district,
            rating: selectedCriteria.rating,
            distance: selectedCriteria.distance,
            priceRange: selectedCriteria.priceRange,
          }}
          className="inline-flex self-end px-5 py-2 rounded bg-gray-100 hover:bg-orange-500 hover:text-white"
        >
          Recommmended Tour
        </Link>
      </div>
    </>
  );
}

function CriteriaField({ name, value, options, handleCriteriaChange }) {
  return (
    <div className="relative">
      <label className="capitalize inline-flex self-start w-full text-lg font-medium">
        {name}
      </label>
      <select
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 mt-2 capitalize text-lg"
        name={name}
        onChange={(e) => handleCriteriaChange(e.target.value, value)}
      >
        {options.map((option, index) => (
          <option className="capitalize" key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
