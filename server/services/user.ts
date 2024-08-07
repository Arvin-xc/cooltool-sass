import seedrandom from "seedrandom";

export function generateInviteCode(userId: string) {
  {
    const length = 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 字符集
    let inviteCode = "";

    // 使用用户的 ID 作为种子，确保每个用户生成的邀请码都是唯一的
    const seed = userId.toString();

    // 使用用户的 ID 和当前时间戳生成随机数作为种子
    const randomSeed = seed + Date.now();

    // 设置随机数种子
    seedrandom(randomSeed, { global: true });

    // 生成邀请码
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      inviteCode += characters.charAt(randomIndex);
    }

    return inviteCode;
  }
}
