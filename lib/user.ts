// lib/user.ts
import { db } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  getDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

// Function to log a recitation
export async function logRecitation(userId: string) {
  const userRef = doc(db, "users", userId);
  const now = Timestamp.now();

  await updateStreak(userId, now);

  await updateDoc(userRef, {
    recitationLogs: arrayUnion(now),
  });
}

// Function to update streaks
// Function to update streaks
async function updateStreak(userId: string, now: Timestamp) {
  const userRef = doc(db, "users", userId);

  // Get the user data
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    const recitationLogs = data.recitationLogs;
    const currentStreak = data.currentStreak || 0;
    const highestStreak = data.highestStreak || 0;

    // Calculate the streak
    const today = new Date().toISOString().split("T")[0];
    const lastRecitationDate = recitationLogs?.length
      ? recitationLogs[recitationLogs.length - 1]
          .toDate()
          .toISOString()
          .split("T")[0]
      : null;

    let newStreak = currentStreak;
    debugger;
    if (lastRecitationDate === today) {
      newStreak = currentStreak;
    } else if (
      lastRecitationDate ===
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0]
    ) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1; // reset streak if no recitation yesterday
    }

    await updateDoc(userRef, {
      currentStreak: newStreak,
      highestStreak: Math.max(newStreak, highestStreak),
    });
  }
}
export async function createUserDocument(
  userId: string,
  email: string,
  name: string
) {
  await setDoc(doc(db, "users", userId), {
    email,
    name,
    totalCount: 0,
    salawatCounts: {},
    recitationLogs: [], // New field for recitation logs
    currentStreak: 0, // New field for current streak
    highestStreak: 0, // New field for highest streak
  });
}

export async function updateUserSalawatCount(
  userId: string,
  salawatId: string,
  count: number
) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`salawatCounts.${salawatId}`]: increment(count),
    totalCount: increment(count),
  });
}
