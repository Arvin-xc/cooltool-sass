import prisma from "@/lib/prisma";
import { OrderStatus, type Order, type SubscriptionType } from "@prisma/client";
import { addSubscription, getSubscriptionPrice } from "./subscription";
import { transactions } from "../wx-pay";

const currency = "CNY";
type UpdateOrderType = {
  orderId: string;
  status: OrderStatus;
  currency: string;
  payerOpenid: string;
  paymentId: string;
};
export async function updateOrderStatus({
  orderId,
  status,
  currency,
  payerOpenid,
  paymentId,
}: UpdateOrderType) {
  let order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    console.error(
      `更新订单状态失败! 订单不存在 orderId:${orderId}, status:${status}`
    );
    throw createError({
      statusCode: 400,
      message: "订单不存在",
    });
  }

  if (order.status === "CREATED") {
    try {
      const subscription = await addSubscription({
        userId: order.userId,
        orderId: order.id,
        subscriptionType: order.subscriptionType,
      });

      order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: status,
          currency,
          payerOpenid,
          paymentId,
          subscription: {
            connect: {
              id: subscription.id,
            },
          },
        },
      });
    } catch (error) {
      console.error(
        `更新订单失败! ${error} orderId:${orderId}, status:${status}`
      );
      throw createError({
        statusCode: 500,
        message: "更新订单状态失败",
      });
    }
  } else if (order.status === "CANCELED") {
    console.warn(`订单已取消! orderId:${orderId}, userId:${order.userId}`);
    throw createError({
      statusCode: 400,
      message: "订单已取消",
    });
  }

  console.log(
    `订阅成功! userId:${order.userId}, orderId:${order.id}, subscriptType:${order.subscriptionType}`
  );
  return order;
}

export async function createOrder(
  userId: string,
  subscriptionType: SubscriptionType
) {
  const subscriptionPrice = await getSubscriptionPrice(subscriptionType);
  if (!subscriptionPrice) {
    throw new Error("订阅商品不存在");
  }
  const createdOrder = await prisma.order.create({
    data: {
      amount: subscriptionPrice.price,
      subscriptionType,
      status: OrderStatus.CREATED,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  cancelOrderAfterHalfAnHour(createdOrder.id);
  console.log(
    `创建预付单成功! userId:${createdOrder.userId} orderId:${createdOrder.id} amount:${createdOrder.amount}`
  );
  return createdOrder;
}
export async function wechatPay(
  order: Omit<Order, "createdAt" | "status" | "updatedAt" | "subscriptionId">
) {
  const params = {
    currency,
    orderId: order.id,
    payerOpenid: order.payerOpenid!,
    paymentId: order.paymentId!,
  };
  const res = await transactions({
    description: order.subscriptionType,
    attach: new URLSearchParams(params).toString(),
    out_trade_no: order.id,
    notify_url: process.env.WECHAT_PAY_CALLBACK_URL!,
    amount: {
      total: order.amount,
      currency,
    },
    payer: { openid: order.payerOpenid! },
  });

  if (res.status === 400) {
    const err = JSON.parse(res.error);
    if (err.code === "ORDERPAID") {
      return "订单已支付";
    } else {
      console.error(`下单异常，未知异常 response:${JSON.stringify(res)}`);
      return "服务异常";
    }
  }
  if (res.status !== 200) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "CANCELED",
        currency,
        payerOpenid: order.payerOpenid,
        paymentId: order.paymentId,
      },
    });
    console.error(
      `微信订单创建失败! userId:${order.userId} orderId:${
        order.id
      }, response:${JSON.stringify(res)}`
    );
    throw createError({
      statusCode: 500,
      message: "创建订单失败",
    });
  }
  console.log(
    `微信支付中! openid:${order.payerOpenid}, orderId:${order.id} amount:${order.amount}`
  );
  return res.data;
}

export async function queryOrders(userId: string) {
  return await prisma.order.findMany({
    where: {
      userId,
      status: "PAID",
    },
    include: { subscription: true },
  });
}

export async function queryOrder(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
  });
}

export async function cancelOrderAfterHalfAnHour(orderId: string) {
  setTimeout(() => {
    try {
      prisma.order
        .findUnique({
          where: { id: orderId },
        })
        .then(async (order) => {
          if (order?.status === "CREATED") {
            await prisma.order.update({
              where: { id: orderId },
              data: {
                status: "CANCELED",
              },
            });
            console.warn(`订单超时，自动关闭! orderId:${orderId}`);
          }
        });
    } catch (error) {
      console.error(`取消订单失败! orderId:${orderId}`, error);
    }
  }, 1000 * 60 * 30);
}
