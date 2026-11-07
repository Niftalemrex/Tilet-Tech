import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/src/lib/supabaseClient";

// 📥 GET reviews
export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json([
      {
        id: "1",
        name: "Dawit Bekele",
        comment: "Tilet Technologies conducted our enterprise penetration test and secured our payment APIs. Zero downtime, exceptional reporting, and world-class cybersecurity standards.",
        rating: 5,
        created_at: "2026-03-12T10:00:00.000Z",
      },
      {
        id: "2",
        name: "Sara Mengistu",
        comment: "Their zero-trust cloud architecture and Kubernetes setup modernized our fintech operations in Addis Ababa. Truly pro next-level engineering.",
        rating: 5,
        created_at: "2026-02-28T14:30:00.000Z",
      },
    ]);
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 📤 POST review
export async function POST(req: Request) {
  const body = await req.json();
  const { name, comment, rating } = body;

  // 🛡️ validation
  if (!name || !comment) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured) {
    // Graceful mock receipt when env not configured
    return NextResponse.json({ success: true, simulated: true });
  }

  const { error } = await supabase.from("reviews").insert([
    {
      name,
      comment,
      rating,
    },
  ]);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
