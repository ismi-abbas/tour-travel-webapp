import { useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import { useSearchParams, useNavigate } from "react-router-dom";

const LocationDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [_searchQuery, setSearchQuery] = useState(
    searchParams.get("filter") || ""
  );

  const searchPlace = (place, isDistrict) => {
    if (!isDistrict) return;
    setSearchQuery(encodeURIComponent(place)); // Update searchQuery with the correct value

    setSearchParams({ filter: place });
    navigate(`/tour-catalog?filter=${encodeURIComponent(place)}`);
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
    <Dropdown title="Location">
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
