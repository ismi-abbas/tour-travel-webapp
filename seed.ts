import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { placeSchema } from "./schema";
// @ts-ignore
import places from "./data.json";

const connectionString = process.env.CONNECTION_STRING;
const client = postgres(connectionString);
const db = drizzle(client);
const allUsers = await db.select().from(placeSchema);

for (let place of places) {
  let count = place.priceLevel !== null ? place.priceLevel.split("$").length - 1 : 0;
  let subcategory = JSON.stringify(place.subcategories);
  console.log(subcategory);
  await db.insert(placeSchema).values({
    address: place.address,
    addressStreet_1: place.addressObj.street1,
    addressStreet_2: place.addressObj.city,
    city: place.addressObj.city,
    state: place.addressObj.state,
    postalCode: place.addressObj.postalcode,
    type: place.type,
    name: place.name,
    description: place.description,
    image: place.image,
    category: place.category,
    subcategory: place.subcategories,
    rating: place.rating,
    phone: place.phone,
    email: place.email,
    latitude: place.latitude,
    longitude: place.longitude,
    numberOfReviews: place.numberOfReviews,
    priceRange: place.priceRange,
    priceLevel: count,
    hotelClass: place.hotelClass
  });
}

console.log("migration done");
