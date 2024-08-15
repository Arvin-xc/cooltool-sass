import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/@types/supabase";
import { getServerSupabaseUser } from "~/server/utils";
export default eventHandler(async (event) => {
  const supabaseClient = await serverSupabaseClient<Database>(event);
  const supabaseUser = await getServerSupabaseUser(event);
  const query = getQuery(event);
  const orderId = query.id;

  if (supabaseUser?.id && orderId) {
    const { data } = await supabaseClient
      .from("Order")
      .select("*")
      .eq("id", orderId)
      .eq("userId", supabaseUser.id);
    return data;
  } else {
    throw createError({
      statusCode: 400,
      message: "参数异常",
    });
  }
});
