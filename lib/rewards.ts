import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// lib/rewards.ts
export async function checkAndAwardBadges(userId: string) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    const highestStreak = data.highestStreak;

    let newBadge = null;

    if (highestStreak >= 7 && highestStreak < 30) {
      newBadge = "Weekly Streaker";
    } else if (highestStreak >= 30) {
      newBadge = "Monthly Streaker";
    }

    if (newBadge) {
      await updateDoc(userRef, {
        badges: arrayUnion(newBadge),
      });
    }
  }
}
