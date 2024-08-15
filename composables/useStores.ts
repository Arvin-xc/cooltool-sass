import type { Database } from "~/@types/supabase";

const user = await useSupabaseUser();
const supabaseClient = await useSupabaseClient<Database>();

export async function useSubscription() {
  const { data: subscription } = await supabaseClient
    .from("Subscription")
    .select("*")
    .eq("userId", user.value.id);

  return subscription?.[0];
}

export async function usePricing() {
  const { data: pricing } = await supabaseClient
    .from("SubscriptionPrice")
    .select("*");

  return pricing || [];
}
