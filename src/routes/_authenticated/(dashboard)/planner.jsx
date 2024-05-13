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
    value: "criteria1",
    options: [
      { name: "option 1", value: "option1" },
      { name: "option 2", value: "option2" },
      { name: "option 3", value: "option3" },
    ],
  },
  {
    name: "Distance",
    value: "criteria2",
    options: [
      { name: "option 1", value: "option1" },
      { name: "option 2", value: "option2" },
      { name: "option 3", value: "option3" },
    ],
  },
  {
    name: "Price Range",
    value: "criteria3",
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
  const [criteriaList, setCriteriaList] = useState(criterias);
  const [selectedState, setSelectedState] = useState("kelantan");

  useEffect(() => {
    const districtDropdown = criterias.find(
      (data) => data.name === selectedState,
    );

    console.log("districtDropdown", districtDropdown);

    console.log("selectedState", selectedState);
  }, [selectedState]);
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
                selectedDistrict={setSelectedState}
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

function CriteriaField({ name, options, selectedDistrict }) {
  return (
    <div className="relative">
      <label className="capitalize inline-flex self-start w-full">{name}</label>
      {name.toLowerCase() === "state" ? (
        <>
          <select
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2 capitalize"
            name={name}
            onChange={(e) => {
              selectedDistrict(e.target.value);
            }}
          >
            {options.map((option, index) => (
              <option className="capitalize" key={index} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <select
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2 capitalize"
          name={name}
        >
          {options.map((option, index) => (
            <option className="capitalize" key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
