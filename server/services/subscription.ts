import prisma from "@/lib/prisma";
import type { Subscription, SubscriptionType } from "@prisma/client";
import { calculateSubscriptionEndDate } from "./utils";

type AddSubscriptionProps = {
  userId: string;
  orderId?: string;
  invitationId?: number;
  subscriptionType: SubscriptionType;
};

export async function addSubscription({
  userId,
  orderId,
  invitationId,
  subscriptionType,
}: AddSubscriptionProps) {
  let subscription: Subscription;

  try {
    subscription = await prisma.subscription.findUnique({
      where: {
        userId: userId,
      },
    });

    if (subscription) {
      await prisma.subscription.update({
        where: { userId },
        data: {
          endDate: calculateSubscriptionEndDate(
            subscription.endDate,
            subscriptionType
          ),
        },
      });
    } else {
      const startDate = new Date();

      if (orderId) {
        // 处理支付情况
        subscription = await prisma.subscription.create({
          data: {
            startDate: startDate,
            endDate: calculateSubscriptionEndDate(startDate, subscriptionType),
            type: subscriptionType,
            user: {
              connect: {
                id: userId,
              },
            },
            orders: {
              connect: {
                id: orderId,
              },
            },
          },
        });
      } else if (invitationId) {
        // 处理邀请情况
        subscription = await prisma.subscription.create({
          data: {
            startDate: startDate,
            endDate: calculateSubscriptionEndDate(startDate, subscriptionType),
            type: subscriptionType,
            user: {
              connect: {
                id: userId,
              },
            },
            invitation: {
              connect: {
                id: invitationId,
              },
            },
          },
        });
      } else {
        console.error(
          `添加订阅失败! 未提供orderId或invitationId. userId:${userId} subscriptionType:${subscriptionType}`
        );
        throw new Error("订阅失败!");
      }
    }
  } catch (error) {
    console.error(
      `添加订阅失败! userId:${userId}, orderId:${orderId}, subscriptType:${subscriptionType}`,
      error
    );
    throw new Error("订阅失败!");
  }

  return subscription;
}

export async function getSubscription(userId: string) {
  return await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    include: {
      orders: true,
    },
  });
}
export async function getSubscriptionPrices() {
  const res = await prisma.subscriptionPrice.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return res;
}
export async function getSubscriptionPrice(type: SubscriptionType) {
  const res = await prisma.subscriptionPrice.findUnique({
    where: {
      type,
    },
  });
  return res;
}
