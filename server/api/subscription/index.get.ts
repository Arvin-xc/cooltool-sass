import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/@types/supabase";

export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "未登录",
    });
  }
  const supabaseClient = await serverSupabaseClient<Database>(event);

  const { data: subscription } = await supabaseClient
    .from("Subscription")
    .select("*")
    .eq("userId", user?.id);

  return subscription?.[0];
});
