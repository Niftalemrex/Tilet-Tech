// lib/fetchReviews.ts
import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Type for a review row
export type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
};

const defaultReviews: Review[] = [
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
  {
    id: "3",
    name: "Yohannes Haile",
    comment: "The team built an outstanding high-throughput laboratory dashboard with custom Amharic and Arabic localization. Fast, reliable, and secure.",
    rating: 5,
    created_at: "2026-01-19T09:15:00.000Z",
  },
];

// Fetch reviews
export async function getReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    return defaultReviews;
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase notice fetching reviews, using fallback:", error.message);
      return defaultReviews;
    }

    return (data as Review[]) && data.length > 0 ? (data as Review[]) : defaultReviews;
  } catch (err) {
    console.warn("Unexpected error fetching reviews, using fallback:", err);
    return defaultReviews;
  }
}
