import { useParams } from "react-router-dom";
import AuthenticatedLayout from "../AuthenticatedLayout";
import { IoHeartCircleOutline, IoLink, IoPin, IoStar } from "react-icons/io5";
import { useEffect } from "react";
import { getPlaceDetails } from "../../services/query";
import { useState } from "react";

const DetailPage = () => {
  const { placeId, type } = useParams();
  const [placeData, setPlaceData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const placeDetails = await getPlaceDetails(type, placeId);

      if (placeDetails) {
        console.log(placeDetails);
        setPlaceData(placeDetails);
      } else {
        console.log("Place details not found.");
      }
    };

    fetchData();
  }, [type, placeId]);

  // Function to generate stars based on the rating count
  const generateStars = (ratingCount) => {
    const stars = Array.from({ length: ratingCount }, (_, index) => (
      <div key={index}>
        <IoStar className="text-green-500 h-4 w-4" />
      </div>
    ));
    return stars;
  };

  const generateGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full p-4">
        <div id="title" className="mt-8 flex flex-col items-start">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl font-bold">{placeData?.name}</h1>
            <span onClick={() => alert("Save trip")}>
              <IoHeartCircleOutline
                className="hover:cursor-pointer hover:text-rose-500"
                size={30}
              />
            </span>
          </div>

          <div className="flex items-center space-x-5 mt-4">
            <div className="flex gap-1">{generateStars(placeData?.rating)}</div>
            <div className="flex items-center space-x-4">
              <h3 className="underline underline-offset-1 text-gray-800">
                {placeData?.rating} reviews
              </h3>

              <div className="size-1 bg-black rounded-full" />

              <h3 className="underline underline-offset-1 text-gray-800">
                #1 of 5 things to do in {placeData?.addressObj.street1}
              </h3>

              <div className="size-1 bg-black rounded-full" />

              <h3 className="underline underline-offset-1 text-gray-800">
                {placeData?.subcategories.join(",")}
              </h3>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="underline">Write a Review</h3>
          </div>

          <div className="grid grid-cols-3 w-full mt-4 gap-4">
            <div className="col-span-1 shadow-md rounded-md p-4">
              <div className="flex flex-col justify-start h-full items-start">
                <div className="w-full flex flex-col items-start space-y-4">
                  <div className="w-full text-start">
                    <p className="w-full inline-flex items-center text-lg">
                      <span>
                        <IoPin size={30} />
                      </span>
                      {placeData?.address}
                    </p>
                  </div>
                  {/* Updated the placement of "See maps" div */}
                  <div className="w-full flex justify-end">
                    <div className="text-sm inline-flex gap-1">
                      See maps
                      <span>
                        <a
                          href={generateGoogleMapsLink(
                            placeData?.latitude,
                            placeData?.longitude
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IoLink size={20} />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 shadow-md rounded-md relative">
              <div className="h-[500px] w-full max-w-full max-h-full">
                <img
                  src={placeData?.image}
                  alt=""
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DetailPage;
