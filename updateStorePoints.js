// updateStorePoints.js
const admin = require("firebase-admin");
const serviceAccount = require("./salawat-admin.json"); // Update path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function updateStorePoints() {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const batch = db.batch();
  snapshot.forEach((doc) => {
    const userData = doc.data();
    const totalCount = userData.totalCount || 0; // Default to 0 if totalCount is missing
    const storePoints = totalCount; // Set storePoints to totalCount

    batch.update(doc.ref, { storePoints });

    console.log(`Updating user ${doc.id} with storePoints: ${storePoints}`);
  });

  await batch.commit();
  console.log("All documents updated.");
}

updateStorePoints().catch(console.error);
