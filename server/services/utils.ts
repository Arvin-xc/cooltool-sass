import { SubscriptionType } from "@prisma/client";
import CryptoJS from "crypto-js";

export const calculateSubscriptionEndDate = (
  lastSubscriptionEndDate: Date | undefined,
  subscriptionType: SubscriptionType
) => {
  const today = new Date();
  let durationStartDate = lastSubscriptionEndDate || new Date();

  if (
    lastSubscriptionEndDate &&
    lastSubscriptionEndDate.getTime() < today.getTime()
  ) {
    durationStartDate = today;
  }

  let durationTime;
  switch (subscriptionType) {
    case SubscriptionType.YEARLY:
      durationTime = 365 * 24 * 60 * 60 * 1000;
      break;
    case SubscriptionType.MONTHLY:
      durationTime = 30 * 24 * 60 * 60 * 1000;
      break;
    case SubscriptionType.INVITE:
      durationTime = 7 * 24 * 60 * 60 * 1000;
      break;
    default:
      durationTime = 0;
  }
  return new Date(durationTime + durationStartDate.getTime());
};

export const decryptWithPrivateKey = (encryptedText: string | CryptoJS.lib.CipherParams) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.CREATE_ORDER_PRIVATE_KEY!
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
