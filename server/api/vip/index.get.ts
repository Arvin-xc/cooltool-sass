import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/@types/supabase";
export default eventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
    });
  }

  if (user?.id) {
    const supabaseClient = await serverSupabaseClient<Database>(event);

    const { data: subscription } = await supabaseClient
      .from("Subscription")
      .select("*")
      .eq("userId", user.id);
    const validSubscription = subscription?.find((item) => {
      return new Date(item.endDate).getTime() > new Date().getTime();
    });
    return !!validSubscription;
  }

  throw createError({
    statusCode: 400,
  });
});
