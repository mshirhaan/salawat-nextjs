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
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

// Function to log a recitation
export async function logRecitation(userId: string) {
  const userRef = doc(db, "users", userId);
  const now = Timestamp.now();

  await updateStreak(userId, now);

  await updateDoc(userRef, {
    recitationLogs: arrayUnion(now),
  });

  // Check and award badges
  await checkAndAwardBadges(userRef);
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
    recitationLogs: [], // Field for recitation logs
    currentStreak: 0, // Field for current streak
    highestStreak: 0, // Field for highest streak
    dailySalawatCounts: {}, // New field for daily Salawat counts
    weeklySalawatCounts: {}, // New field for weekly Salawat counts
    monthlySalawatCounts: {}, // New field for monthly Salawat counts
    lastRecitationDate: null, // New field to track the last recitation date
    badges: {},
  });
}

export async function updateUserSalawatCount(
  userId: string,
  salawatId: string,
  count: number
) {
  const userRef = doc(db, "users", userId);
  const now = new Date();
  const dayId = getDayId(now);
  const weekId = getWeekId(now);
  const monthId = getMonthId(now);

  await updateDoc(userRef, {
    [`salawatCounts.${salawatId}`]: increment(count),
    totalCount: increment(count),
    [`dailySalawatCounts.${dayId}.${salawatId}`]: increment(count),
    [`dailySalawatCounts.${dayId}.totalCount`]: increment(count),
    [`weeklySalawatCounts.${weekId}.${salawatId}`]: increment(count),
    [`weeklySalawatCounts.${weekId}.totalCount`]: increment(count),
    [`monthlySalawatCounts.${monthId}.${salawatId}`]: increment(count),
    [`monthlySalawatCounts.${monthId}.totalCount`]: increment(count),
  });
}

function getWeekId(date: Date): string {
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  return `${year}-W${weekNumber.toString().padStart(2, "0")}`;
}

function getMonthId(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getDayId(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

// Function to check and award badges based on recitations
async function checkAndAwardBadges(userRef: DocumentReference<DocumentData>) {
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    const recitationLogs = data.recitationLogs || [];
    const dailySalawatCounts = data.dailySalawatCounts || {};
    const weeklySalawatCounts = data.weeklySalawatCounts || {};
    const monthlySalawatCounts = data.monthlySalawatCounts || {};
    const currentStreak = data.currentStreak || 0;
    const highestStreak = data.highestStreak || 0;
    const badges = data.badges || []; // Change to array of strings

    // Example: Award the "100 Salawat" badge
    if (data.totalCount >= 100 && !badges.includes("100Salawat")) {
      badges.push("100Salawat");
    }

    // Example: Award the "Daily Reciter" badge
    if (
      Object.keys(dailySalawatCounts).length >= 7 &&
      !badges.includes("DailyReciter")
    ) {
      badges.push("DailyReciter");
    }

    // Example: Award the "One Week Streak" badge
    if (currentStreak >= 7 && !badges.includes("OneWeekStreak")) {
      badges.push("OneWeekStreak");
    }

    // Update badges in Firestore
    await updateDoc(userRef, {
      badges,
    });
  }
}
