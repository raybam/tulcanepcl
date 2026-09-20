const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding / updating Tulcan Admin credentials...');

  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'TulcanAdmin2024!';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(defaultPassword, salt);

  // 1. admin@tulcanenergy.com
  const admin1 = await prisma.adminUser.upsert({
    where: { email: 'admin@tulcanenergy.com' },
    update: {
      password: hashedPassword,
      name: 'Tulcan Super Admin',
      role: 'SUPERADMIN',
    },
    create: {
      email: 'admin@tulcanenergy.com',
      name: 'Tulcan Super Admin',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });
  console.log(`✓ Seeded Admin User: ${admin1.email} (Password: ${defaultPassword})`);

  // 2. admin@tulcanepc.com
  const admin2 = await prisma.adminUser.upsert({
    where: { email: 'admin@tulcanepc.com' },
    update: {
      password: hashedPassword,
      name: 'Tulcan Administrator',
      role: 'SUPER_ADMIN',
    },
    create: {
      email: 'admin@tulcanepc.com',
      name: 'Tulcan Administrator',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✓ Seeded Admin User: ${admin2.email} (Password: ${defaultPassword})`);

  console.log('Admin credentials seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Failed to seed admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
