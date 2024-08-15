import type { Database } from "~/@types/supabase";

export async function useSubscription() {
  const user = useSupabaseUser();
  const supabaseClient = useSupabaseClient<Database>();

  if (!user.value) return null;
  const { data: subscription } = await supabaseClient
    .from("Subscription")
    .select("*")
    .eq("userId", user.value.id);

  return subscription?.[0];
}

export async function usePricing() {
  const supabaseClient = useSupabaseClient<Database>();

  const { data: pricing } = await supabaseClient
    .from("SubscriptionPrice")
    .select("*");

  return pricing || [];
}
