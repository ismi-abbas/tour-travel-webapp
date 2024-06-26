import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { placeSchema } from "./schema";
// @ts-ignore
import places from "./data.json";

const connectionString =
  "postgres://postgres.ntnunlxrptzcwflsjleh:Qy88p27RlAycbURU@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";
console.log(connectionString);
const client = postgres(connectionString);
const db = drizzle(client);

for (let place of places) {
  let count =
    place.priceLevel !== null ? place.priceLevel.split("$").length - 1 : 0;
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
    hotelClass: place.hotelClass,
  });
}

console.log("migration done");
