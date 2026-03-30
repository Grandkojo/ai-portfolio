import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getPortfolioAdminDb } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";

function getDateKey() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST() {
  const dateKey = getDateKey();

  try {
    const db = getPortfolioAdminDb();
    const ref = db.collection("analytics").doc("site_stats");

    await ref.set(
      {
        visits: FieldValue.increment(1),
        daily: {
          [dateKey]: FieldValue.increment(1),
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (adminError) {
    // Fallback to Web SDK path if Admin SDK env is not present.
    try {
      const ref = doc(db, "analytics", "site_stats");
      await setDoc(
        ref,
        {
          visits: increment(1),
          daily: {
            [dateKey]: increment(1),
          },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return NextResponse.json({ ok: true, mode: "fallback" });
    } catch (fallbackError) {
      console.error("Failed to increment portfolio visit:", adminError, fallbackError);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }
}
