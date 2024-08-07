import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();

  // console.log('Seeding...');

  // const user1 = await prisma.user.create({
  //   data: {
  //     phone: 'arvin@qq.com',
  //     password: 'iamoiandyou3', // secret42
  //     role: 'ADMIN',
  //   },
  // });
  await prisma.subscriptionPrice.deleteMany();
  await prisma.subscriptionPrice.createMany({
    data: [
      {
        id: 0,
        title: '1年+2个月',
        subtitle: '低至元9/月',
        price: 12600,
        tag: '限时多送2个月',
        type: 'YEARLY',
      },
      {
        id: 1,
        title: '1个月',
        subtitle: '每月15元',
        price: 1500,
        tag: '',
        type: 'MONTHLY',
      },
      {
        id: 2,
        title: '3个月',
        subtitle: '每月15元',
        price: 4500,
        tag: '',
        type: 'QUARTERLY',
      },
      {
        id: 3,
        title: '半年',
        subtitle: '每月13.4元',
        price: 8000,
        type: 'SEMIANNUALLY',
        tag: '',
      },
    ],
  });

  // console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
