import {
  initializeApp,
  credential as _credential,
  firestore as _firestore,
  app,
} from "firebase-admin";
import serviceAccount from "path/to/your/serviceAccountKey.json"; // Update with your service account key path

initializeApp({
  credential: _credential.cert(serviceAccount),
});

const firestore = _firestore();

// Replace 'your_collection' with the actual collection name

const states = [
  "kelantan",
  "pahang",
  "terengganu",
  "perak",
  "melaka",
  "johor",
].sort();

async function seedFirestore() {
  try {
    for (const state of states) {
      const collectionRef = firestore.collection(state);
      // Example data to seed into the collection
      const dataToSeed = [
        { name: "Item 1", description: "Description 1", value: 10 },
        { name: "Item 2", description: "Description 2", value: 20 },
        // Add more data as needed
      ];

      for (const data of dataToSeed) {
        // Use add() to automatically generate document IDs
        await collectionRef.add(data);
      }

      console.log(`Data seeded successfully for state: ${state}`);
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the Firebase Admin app when done
    await app().delete();
  }
}

seedFirestore();
