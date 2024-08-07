import { serverSupabaseClient } from "#supabase/server";
import { generateInviteCode, getServerSupabaseUser } from "~/server/utils";
import { Database } from "~/@types/supabase";

export default eventHandler(async (event) => {
  const supabaseUser = await getServerSupabaseUser(event);
  const supabaseClient = await serverSupabaseClient<Database>(event);

  if (!supabaseUser) {
    throw createError({
      statusCode: 401,
      message: "未登录",
    });
  }

  const body = await readBody(event);
  const { subscriptionType } = body;

  if (!subscriptionType) {
    throw createError({
      statusCode: 400,
      message: "参数异常",
    });
  }
  const { data: users, error: usersError } = await supabaseClient
    .from("User")
    .upsert({
      id: supabaseUser.id,
      updatedAt: new Date().toDateString(),
      password: "",
      inviteCode: generateInviteCode(supabaseUser.id),
      role: "USER",
    })
    .select();
  usersError && console.log("usersError", usersError);

  const { data: subscriptions, error: subscriptionsError } =
    await supabaseClient
      .from("SubscriptionPrice")
      .select("*")
      .eq("type", subscriptionType);

  subscriptionsError && console.log("subscriptionsError", subscriptionsError);

  if (users && subscriptions) {
    const [user] = users;
    const [subscription] = subscriptions;
    const { data: orders, error: orderError } = await supabaseClient
      .from("Order")
      .insert({
        id: `${user.id}-${new Date().getTime()}`,
        subscriptionType,
        status: "CREATED",
        updatedAt: new Date().toDateString(),
        amount: subscription.price,
        userId: user.id,
      })
      .select();
    orderError && console.log("orderError", orderError);
    const order = orders?.[0];
    console.log(
      "创建订单成功: ",
      "orderId:",
      order?.id,
      " ,orderType:",
      order?.subscriptionType
    );
    return orders;
  } else {
    console.error(
      "服务异常 user:",
      users,
      "subscriptionType",
      subscriptionType
    );
    throw createError({
      statusCode: 500,
      message: "服务异常",
    });
  }
});
