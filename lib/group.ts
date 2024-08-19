import { db } from "./firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export async function createGroup(userId: string, groupName: string) {
  const groupRef = doc(db, "groups", groupName);
  
  await setDoc(groupRef, {
    groupName,
    members: [userId],
    totalSalawatCount: 0,
    leaderboard: {}
  });

  // Add groupId to user's groups array
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    groups: arrayUnion(groupRef.id)
  });
}

export async function joinGroup(userId: string, groupId: string) {
    const groupRef = doc(db, "groups", groupId);
    
    // Add user to group
    await updateDoc(groupRef, {
      members: arrayUnion(userId)
    });
  
    // Add groupId to user's groups array
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      groups: arrayUnion(groupId)
    });
  }