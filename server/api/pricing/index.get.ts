import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/@types/supabase";

export default eventHandler(async (event) => {
  const supabaseClient = await serverSupabaseClient<Database>(event);

  const { data: pricing } = await supabaseClient
    .from("SubscriptionPrice")
    .select("*");

  return pricing;
});
