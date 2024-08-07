import { serverSupabaseUser } from "#supabase/server";
import type { H3Event } from "h3";

export async function getServerSupabaseUser(event: H3Event) {
  try {
    return await serverSupabaseUser(event);
  } catch (e) {
    console.error("getServerSupabaseUser error", e);
  }
}
