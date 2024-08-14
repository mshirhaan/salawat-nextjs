import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const salawatCollection = collection(db, "salawat");
    const salawatSnapshot = await getDocs(salawatCollection);
    const salawatList = salawatSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(salawatList);
  } catch (error) {
    console.error("Error fetching Salawat data:", error);
    return NextResponse.error();
  }
}
