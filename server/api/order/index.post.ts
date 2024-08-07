import { Role } from "@prisma/client";
import { createOrder } from "../../services/order";
import prisma from "@/lib/prisma";
import { generateInviteCode } from "../../services/user";
import { getServerSupabaseUser } from "~/server/utils";

export default eventHandler(async (event) => {
  const supabaseUser = await getServerSupabaseUser(event);

  if (!supabaseUser) {
    throw createError({
      statusCode: 401,
      message: "未登录",
    });
  }

  const body = await readBody(event);
  console.log("body", body);
  const { subscriptionType } = body;

  if (!subscriptionType) {
    throw createError({
      statusCode: 400,
      message: "参数异常",
    });
  }
  try {
    const user = await prisma.user.upsert({
      where: { supabaseId: supabaseUser.id },
      create: {
        supabaseId: supabaseUser.id,
        password: "",
        inviteCode: generateInviteCode(supabaseUser.id),
        role: Role.USER,
      },
      update: {},
    });

    const order = await createOrder(user.id, subscriptionType);
    console.info("Order created successfully for user %s", user.id);
    return order;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "服务异常，请稍后再试！",
    });
  }
});
