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

async function seedFirestore() {
  try {
    const collectionRef = firestore.collection("pahang");
    // Example data to seed into the collection
    const dataToSeed = [
      { name: "image", description: "Description 1", value: 10 },
      { name: "image", description: "Description 2", value: 20 },
      // Add more data as needed
    ];

    for (const data of dataToSeed) {
      // Use add() to automatically generate document IDs
      await collectionRef.add(data);
    }

    console.log("Data seeded successfully for state: pahang");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the Firebase Admin app when done
    await app().delete();
  }
}

seedFirestore();
