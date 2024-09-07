// utils/auth.ts
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const checkAuthState = (): Promise<boolean> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
};
