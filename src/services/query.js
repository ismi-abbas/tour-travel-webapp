import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getAttractions(place) {
  const attractionsRef = collection(db, "attractions");
  const snapshot = await getDocs(
    query(attractionsRef, where("addressObj.state", "==", place), limit(8))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const attractionsList = [];
  snapshot.forEach((doc) => {
    attractionsList.push({
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      description: doc.data().description,
      image: doc.data().image,
      rating: doc.data().rating,
      category: doc.data().category,
    });
  });

  return attractionsList;
}

export async function getHotelsList(place) {
  const attractionsRef = collection(db, "hotels");
  const snapshot = await getDocs(
    query(attractionsRef, where("addressObj.state", "==", place), limit(8))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const attractionsList = [];
  snapshot.forEach((doc) => {
    attractionsList.push({
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      description: doc.data().description,
      image: doc.data().image,
      rating: doc.data().rating,
      category: doc.data().category,
    });
  });

  return attractionsList;
}

export async function getRestaurantList(place) {
  const attractionsRef = collection(db, "restaurants");
  const snapshot = await getDocs(
    query(attractionsRef, where("addressObj.state", "==", place), limit(8))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const attractionsList = [];
  snapshot.forEach((doc) => {
    attractionsList.push({
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      description: doc.data().description,
      image: doc.data().image,
      rating: doc.data().rating,
      category: doc.data().category,
    });
  });

  return attractionsList;
}

export async function getPlaceDetails(type, placeId) {
  const docRef = doc(db, type, placeId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}
