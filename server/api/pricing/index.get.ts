import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/@types/supabase";
export default eventHandler(async (event) => {
  const supabaseClient = await serverSupabaseClient<Database>(event);
  return supabaseClient.from("SubscriptionPrice").select("*");
});
