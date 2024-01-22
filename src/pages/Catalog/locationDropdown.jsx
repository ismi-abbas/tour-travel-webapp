import Dropdown from "react-multilevel-dropdown";
import { useNavigate } from "react-router-dom";

const LocationDropdown = () => {
  const navigate = useNavigate();

  const searchPlace = (place, isDistrict) => {
    if (!isDistrict) return;

    const params = new URLSearchParams(window.location.search);
    params.set("filter", place.toLowerCase());

    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  const location = [
    {
      name: "pahang",
      district: [
        "Rompin",
        "Temerloh",
        "Jerantut",
        "Raub",
        "Kuantan",
        "Genting Highlands",
        "Brinchang",
        "Tanah Rata",
        "Temerloh",
        "Jerantut",
        "Mentakab",
        "Kuala Tahan",
        "Raub",
        "Kuala Rompin",
        "Janda Baik",
        "Bukit Tinggi",
        "Kuantan",
        "Cherating",
        "Kampung Temiang",
        "Ringlet",
        "Karak",
        "Juara",
        "Salang",
      ],
    },
    {
      name: "terengganu",
      district: [
        "dungun",
        "perhentian",
        "Kuala Terengganu",
        "Marang",
        "Kijal",
        "Chukai",
        "Dungun",
        "Paka",
        "Kerteh",
        "Hulu Chukai",
      ],
    },
    {
      name: "kelantan",
      district: ["Kota Bharu", "Tumpat", "Gua Musang", "Rantau Panjang"],
    },
  ];

  return (
    <Dropdown title="Location" buttonClassName="bg-white">
      {location.map((state, index) => (
        <Dropdown.Item
          key={index}
          className="capitalize"
          onClick={() => searchPlace(state.name, false)}
        >
          {state.name}
          {state.district.length > 0 && (
            <Dropdown.Submenu>
              {state.district.map((district, index) => (
                <Dropdown.Item
                  key={index}
                  className="capitalize"
                  onClick={() => searchPlace(district, true)}
                >
                  {district}
                </Dropdown.Item>
              ))}
            </Dropdown.Submenu>
          )}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default LocationDropdown;
