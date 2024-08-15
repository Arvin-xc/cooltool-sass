import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/@types/supabase";
import { getServerSupabaseUser } from "~/server/utils";

export default eventHandler(async (event) => {
  const supabaseClient = await serverSupabaseClient<Database>(event);
  const supabaseUser = await getServerSupabaseUser(event);

  if (!supabaseUser) {
    throw createError({
      statusCode: 401,
      message: "未登录",
    });
  }

  const { data: orders } = await supabaseClient
    .from("Order")
    .select("*")
    .filter("status", "eq", "PAID")
    .eq("userId", supabaseUser.id);

  return orders;
});
