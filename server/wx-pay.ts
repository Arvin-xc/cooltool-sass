import WxPay from "wechatpay-node-v3"; // 支持使用require
import crypto from "crypto";
import { Ijsapi } from "wechatpay-node-v3/dist/lib/interface";

const privateKey = Buffer.from(process.env.WECHAT_PAY_PRIVATE_KEY!);
const publicKey = Buffer.from(process.env.WECHAT_PAY_PUBLIC_KEY!);
export const pay = new WxPay({
  appid: process.env.WECHAT_PAY_APPID!,
  mchid: process.env.WECHAT_PAY_MCHID!,
  publicKey,
  privateKey,
});

export const transactions = (params: Ijsapi) => {
  return pay.transactions_jsapi(params);
};

export function sha256WithRsa(data: string): string {
  if (!privateKey) throw new Error("缺少秘钥文件");
  return crypto
    .createSign("RSA-SHA256")
    .update(data)
    .sign(privateKey, "base64");
}
