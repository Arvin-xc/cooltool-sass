import type { Database } from "~/@types/supabase";

export async function useSubscription() {
  const user = await useSupabaseUser();
  const supabaseClient = await useSupabaseClient<Database>();

  if (!user.value) return null;
  const { data: subscription } = await supabaseClient
    .from("Subscription")
    .select("*")
    .eq("userId", user.value.id);

  return subscription?.[0];
}

export async function usePricing() {
  const supabaseClient = await useSupabaseClient<Database>();

  const { data: pricing } = await supabaseClient
    .from("SubscriptionPrice")
    .select("*");

  return pricing || [];
}
