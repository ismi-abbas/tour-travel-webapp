import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/(dashboard)/planner")({
  component: PlanTour,
});

const states = [
  {
    name: "Kelantan",
    value: "kelantan",
    district: [
      { value: "kota_bharu", name: "Kota Bharu" },
      { value: "tumpat", name: "Tumpat" },
      { value: "gua_musang", name: "Gua Musang" },
    ],
  },
  {
    name: "Terengganu",
    value: "terengganu",
    district: [
      {
        value: "kuala_terengganu",
        name: "Kuala Terengganu",
      },
    ],
  },
  {
    name: "Pahang",
    value: "pahang",
    district: [
      {
        value: "janda_baik",
        name: "Janda Baik",
      },
      {
        value: "bentong",
        name: "Bentong",
      },
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
      { name: "option 1", value: "option1" },
      { name: "option 2", value: "option2" },
      { name: "option 3", value: "option3" },
    ],
  },
  {
    name: "Distance",
    value: "distance",
    options: [
      { name: "option 1", value: "option1" },
      { name: "option 2", value: "option2" },
      { name: "option 3", value: "option3" },
    ],
  },
  {
    name: "Price Range",
    value: "priceRange",
    options: [
      { name: "option 1", value: "option1" },
      { name: "option 2", value: "option2" },
      { name: "option 3", value: "option3" },
    ],
  },
];

function filterDistrict(selected) {
  const districtList = states.find((state) => state.value === selected);

  if (districtList) {
    return districtList.district;
  }

  console.log(JSON.stringify(districtList));
  return districtList;
}

export default function PlanTour() {
  const [selected, setSelectedState] = useState();
  const [districtList, setDistrictList] = useState();
  const [criteria, setCriteria] = useState(criterias);

  useEffect(() => {
    if (!selected) setSelectedState("kelantan");
    const data = filterDistrict(selected);

    setDistrictList(data);

    const updatedCriteria = [...criteria];
    updatedCriteria.forEach((criteria) => {
      if (criteria.value === "district") {
        criteria.options = districtList;
      }
    });
    setCriteria(updatedCriteria);
  }, [selected, districtList]);

  return (
    <>
      <div className="h-20 flex flex-col mt-10">
        <h1 className="inline-flex text-3xl font-medium">Plan your tour</h1>

        <h3 className="inline-flex text-lg">Select the criteria</h3>
      </div>

      <div className="flex-1">
        <form action="">
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((criteria, index) => (
              <CriteriaField
                setSelectedState={setSelectedState}
                key={index}
                name={criteria.name}
                value={criteria.value}
                options={criteria.options}
              />
            ))}
          </div>
        </form>
      </div>

      <div className="flex w-full flex-col mt-4">
        <button className="inline-flex self-end px-5 py-2 rounded bg-gray-100 hover:bg-gray-300">
          View Recommmended Tour
        </button>
      </div>
    </>
  );
}

function CriteriaField({ name, options, setSelectedState }) {
  return (
    <div className="relative">
      <label className="capitalize inline-flex self-start w-full">{name}</label>
      <select
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2 capitalize"
        name={name}
        onChange={(e) => setSelectedState(e.target.value)}
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
