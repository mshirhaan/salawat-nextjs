// lib/user.ts
import { badgeConfigs } from "@/app/badgeConfigs";
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
export async function logRecitation(
  userId: string,
  showNotification: ShowNotificationType
) {
  const userRef = doc(db, "users", userId);
  const now = Timestamp.now();
  const xpPerRecitation = 10; // Define how much XP is awarded per recitation

  await updateStreak(userId, now);

  // Increment XP
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    let newXP = userData.xp + xpPerRecitation;
    let newLevel = userData.level;

    // Define the XP needed for each level (e.g., level 1 requires 100 XP, level 2 requires 200 XP, etc.)
    const xpForNextLevel = (newLevel: number) => newLevel * 100;

    // Check if the user has leveled up
    while (newXP >= xpForNextLevel(newLevel)) {
      newXP -= xpForNextLevel(newLevel);
      newLevel += 1;
      showNotification(`🎉 You've reached Level ${newLevel}!`);
    }

    await updateDoc(userRef, {
      recitationLogs: arrayUnion(now),
      xp: newXP,
      level: newLevel,
    });
  }

  // Check and award badges
  await checkAndAwardBadges(userRef, showNotification);
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
    badges: [],
    level: 1, // Starting level
    xp: 0, // Starting XP
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

type ShowNotificationType = (message: string) => void;

// Function to check and award badges based on recitations
async function checkAndAwardBadges(
  userRef: DocumentReference<DocumentData>,
  showNotification: ShowNotificationType
) {
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const data = userDoc.data();
    const badges = data.badges || []; // Change to array of strings
    const newBadges = [];
    // Check and award badges
    for (const badgeKey in badgeConfigs) {
      const badgeConfig = badgeConfigs[badgeKey];
      if (badgeConfig.check(data) && !badges.includes(badgeKey)) {
        badges.push(badgeKey);
        newBadges.push(badgeKey);
      }
    }

    if (newBadges.length > 0) {
      // Update badges in Firestore
      await updateDoc(userRef, { badges });

      // Trigger the notification for each new badge
      newBadges.forEach((badge) => {
        const badgeInfo = badgeConfigs[badge];
        if (badgeInfo) {
          showNotification(`🎉 You've earned the "${badgeInfo.name}" badge!`);
        }
      });
    }
  }
}
