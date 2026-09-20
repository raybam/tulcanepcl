const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.adminUser.count();
  console.log('Admin count:', count);
  const users = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, password: true }
  });
  console.log('Admin users:', users);
}

main().catch(console.error).finally(() => prisma.$disconnect());
