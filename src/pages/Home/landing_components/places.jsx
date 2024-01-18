import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase"; // Adjust the import path as necessary
import { AiFillStar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";

const Places = () => {
  const [places, setPlaces] = useState({});

  async function fetchPlaces() {
    const states = [
      "kelantan",
      "pahang",
      "terengganu",
      "perak",
      "melaka",
      "johor",
    ].sort(); // Add more states if necessary

    let allPlaces = {};

    for (const state of states) {
      const stateCollection = collection(db, state);
      const querySnapshot = await getDocs(stateCollection);
      allPlaces[state] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        img: doc.data().places_img,
        name: doc.data().places_name,
        rating: doc.data().places_rating,
        location: doc.data().places_location,
      }));
    }

    setPlaces(allPlaces);
    console.log(allPlaces);
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Popular Places</h1>
        <button className="px-5 py-2 rounded border border-orange-500 text-orange-600">
          View All
        </button>
      </div>
      {/* Place state sections dynamically based on fetched data */}
      {Object.keys(places).map((state) => (
        <div key={state}>
          <h1 className="text-2xl font-bold capitalize">{state}</h1>
          <div className="places py-10 grid grid-cols-2 xl:grid-cols-3 space-x-8 justify-items-center">
            {places[state].length > 0 ? (
              places[state].map((place) => (
                <div
                  key={place.id}
                  className="place w-[250px] md:w-[330px] h-auto bg-white border rounded-lg p-4 shadow-md hover:shadow-sm hover:cursor-pointer"
                >
                  <div className="w-full h-[150px] md:h-[230px]">
                    <img
                      src={
                        place.img !== "test"
                          ? place.img
                          : "https://plus.unsplash.com/premium_photo-1682091978604-6d163f63d9ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={place.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <h1>{place.name}</h1>
                      <p className="flex items-center space-x-2">
                        <span className="text-yellow-500">
                          <AiFillStar />
                        </span>
                        <span>{place.rating}</span>
                      </p>
                    </div>
                    <p className="flex items-center space-x-2 text-gray-400">
                      <IoLocationOutline /> <span>{place.location}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="places flex flex-col">
                <h3 className="text-center">No Places Found</h3>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;
