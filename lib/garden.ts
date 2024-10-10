import { db } from "./firebase";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

export async function buyPlant(userId: string, plantId: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    myPlants: arrayUnion(plantId), // Add the purchased plant to user's inventory
  });
}

export async function buyLand(userId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const currentPoints = userData?.storePoints || 0;
    const currentGridSize = userData?.myGarden?.gridSize || 3;
    const landPrice = 10000;

    if (currentPoints >= landPrice) {
      await updateDoc(userRef, {
        storePoints: currentPoints - landPrice,
        "myGarden.gridSize": currentGridSize + 1,
      });
    } else {
      alert("Not enough points to buy land.");
    }
  }
}

export async function placePlantInGarden(
  userId: string,
  position: number,
  plantId: string
) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    "myGarden.plants": arrayUnion({ position, plantId }), // Store plant at specific grid position
  });
}

export async function getUserGardenData(userId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      gridSize: 9, // Default to 3x3 grid if not set
      plants: data.myGarden?.plants || [], // List of plants in the garden
      myPlants: data.myPlants || [], // List of all purchased plants
    };
  }

  return { gridSize: 3, plants: [], myPlants: [] };
}

// export async function placePlant(position: number, userId: string) {
//   try {
//     // Assuming you have a way to get the selected plantId from user's choice
//     const selectedPlantId = "examplePlantId"; // Replace with actual plant ID

//     // Get the user's document reference
//     const userRef = doc(db, "users", userId); // You need to pass userId to this function or get it from context

//     // Get the current user document data
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       console.error("User document does not exist.");
//       return;
//     }

//     // Retrieve current garden data
//     const gardenData = userDoc.data()?.myGarden || { gridSize: 3, plants: [] };
//     const currentPlants = gardenData.plants || [];

//     // Add or update the plant in the garden grid
//     const updatedPlants = [
//       ...currentPlants,
//       { position, plantId: selectedPlantId },
//     ];

//     // Update the garden data in Firestore
//     await updateDoc(userRef, {
//       "myGarden.plants": updatedPlants,
//     });

//     console.log("Plant successfully placed!");
//   } catch (error) {
//     console.error("Error placing plant:", error);
//   }
// }
