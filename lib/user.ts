// lib/user.ts
import { db } from "./firebase";
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";

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
