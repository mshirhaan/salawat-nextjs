// app/api/salawat/[id]/route.ts
import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const salawatRef = doc(db, "salawat", params.id);
  const salawatSnap = await getDoc(salawatRef);

  if (!salawatSnap.exists()) {
    return NextResponse.json({ error: "Salawat not found" }, { status: 404 });
  }

  return NextResponse.json(salawatSnap.data());
}
