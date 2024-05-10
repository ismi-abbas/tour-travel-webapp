import Layout from "../AuthenticatedLayout";

function populateDistrcits(state) {
  switch (state) {
    case "Terengganu":
      return ["dungun", "perhentian"];
    case "Kelantan":
      return ["kota bharu", "tumpat", "gua musang", "rantau panjang"];
    case "Pahang":
      return [
        "perak",
        "kota melanu",
        "kota tawau",
        "kota pusing",
        "kota kuantan",
      ];
    default:
      return [];
  }
}
export default function PlanTour() {
  const criterias = [
    {
      name: "State",
      value: "state",
      options: [
        { name: "Kelantan", value: "option1" },
        { name: "Terengganu", value: "option2" },
        { name: "Pahang", value: "option3" },
      ],
    },
    {
      name: "District",
      value: "district",
      options: [
        { name: "option 1", value: "option1" },
        { name: "option 2", value: "option2" },
        { name: "option 3", value: "option3" },
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
      // for hotel and resturants
      name: "Price Range",
      value: "criteria3",
      options: [
        { name: "option 1", value: "option1" },
        { name: "option 2", value: "option2" },
        { name: "option 3", value: "option3" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="h-20 flex flex-col mt-10">
        <h1 className="inline-flex text-3xl font-medium">Plan your tour</h1>

        <h3 className="inline-flex text-lg">Select the criteria</h3>
      </div>

      <div className="flex-1">
        <form action="">
          <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {criterias.map((criteria, index) => (
              <CriteriaField
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
    </Layout>
  );
}

function CriteriaField({ name, options }) {
  return (
    <div className="relative">
      <label className="capitalize inline-flex self-start w-full">{name}</label>
      <select
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2 capitalize"
        name={name}
        onChange={(e) => {
          console.log(e.target.value);
        }}
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
