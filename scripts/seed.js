const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with initial Tulcan Upstream data...');

  // 1. Initial Website Info
  await prisma.websiteInfo.upsert({
    where: { id: 'tulcan-config' },
    update: {},
    create: {
      id: 'tulcan-config',
      title: 'Tulcan Energy Exploration and Production Company Limited',
      contactEmail: 'info@tulcanepc.com',
      contactPhone: '+234 1 234 5678',
      addresses: '100 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria',
    },
  });

  // 2. Initial Admin User
  await prisma.adminUser.upsert({
    where: { email: 'admin@tulcanepc.com' },
    update: {},
    create: {
      email: 'admin@tulcanepc.com',
      name: 'Tulcan Administrator',
      password: 'pbkdf2_sha256$tulcan_default_secure_hash',
      role: 'SUPER_ADMIN',
    },
  });

  // 3. Blog Categories
  const opsCategory = await prisma.blogCategory.upsert({
    where: { slug: 'operations' },
    update: {},
    create: {
      name: 'Operations',
      slug: 'operations',
    },
  });

  const esgCategory = await prisma.blogCategory.upsert({
    where: { slug: 'esg' },
    update: {},
    create: {
      name: 'ESG & Sustainability',
      slug: 'esg',
    },
  });

  // 4. Initial Blogs
  await prisma.blog.upsert({
    where: { slug: 'phase-ii-expansion-tom-shot-bank' },
    update: {},
    create: {
      title: 'Phase II Offshore Subsea Tie-Back Commences at Tom Shot Bank',
      slug: 'phase-ii-expansion-tom-shot-bank',
      description: 'Tulcan Energy announces the initiation of Phase II offshore operations at PPL 244.',
      content: 'Tulcan Energy Exploration and Production Company Limited has officially commenced Phase II subsea infrastructure integration across its operated PPL 244 offshore block in the Akwa Ibom shallow water fairway.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCAQpRdCpMCDEHD_vVNdqVyfQR0fkm2Cvzb4r-KB5Qhf_JCOo55USqt36VVBIPZNiTNBX8FvZ4VvloNwWbE7I5Kg_Sn7ZzU6uQt_Ndfw3qHH6Y6zqMwZwL1yR6c4ZcnINGZMUKgDpRIKuYxHJ5sNR8pa05y6D58YQ-EyuBTh8ZiwbLLk2qMKSg4CN9jtJxK74rZHG7m4GQ5Loc89QBc_eACvFuKYWNc3R0dunh52AGuKYtbN13cJCk',
      categoryId: opsCategory.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  await prisma.blog.upsert({
    where: { slug: 'host-community-infrastructure-inaugurated' },
    update: {},
    create: {
      title: 'New Sustainable Healthcare & Clean Water Facilities Inaugurated in Host Communities',
      slug: 'host-community-infrastructure-inaugurated',
      description: 'Reinforcing social license through multi-million GMoU investments.',
      content: 'In alignment with our Global Memorandum of Understanding (GMoU) commitments, Tulcan Energy has completed and handed over critical civic infrastructure projects across host communities in Delta and Akwa Ibom states.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPA-_hGwXQikYpYdWccffnL4hgmuMlrsuw5YkZDMC3eusSFShIUu_EzYqIEN0NMyKGDSxsLX8aRCwzZ11zBnN1Zwn2TVd8-FplH0smRIYLq5P9HJmD3S3ULTADlcEkj1LTfw50H_L7hGA6ynogLeM6gh99yrAen9exq8TWcISrAh6MtpU677VMgyCJwrrTaLfFSAxjXND2RnSmAplnHUJAxcBIS7pK5c2_XU31-zfACp1BZzG1Pq9D',
      categoryId: esgCategory.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  // 5. Initial Teams (Leadership & Operating Committee)
  const existingStaff = await prisma.staff.count();
  if (existingStaff === 0) {
    await prisma.staff.createMany({
      data: [
        {
          firstName: 'Tayo',
          lastName: 'Adiatu',
          position: 'Managing Director / Chief Executive Officer',
          category: 'LEADERSHIP',
          bio: 'Energy industry leader with over two decades of technical and commercial mastery across Nigerian upstream operations.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzBYHBTCq8czsWA_VIc4q-iR44fh5u55TyhgmtzVLZhbcmJoU-FL9h05QF3K3J4Jd6sbZ7aYP7gBZzd8HI8xFQqRpy1K8r4poQHN9jYTYiHxiriUnCO1aMEYYnqxkoN-QcSF7hdGFQgaUVeh3VgVA_DHwCrU8uATR24j_PVlKKCj-LZVFx-qR18JMSCaeQVfSWSotmAOs4Y077douvcG3Hs5J8QFZTZ_1uuorvxP6iHyxyIbBZvSeS',
          orderIndex: 1,
        },
        {
          firstName: 'Engr. Nnamdi',
          lastName: 'Okonkwo',
          position: 'Executive Director / Chief Operating Officer',
          category: 'LEADERSHIP',
          bio: 'Petroleum engineer with extensive deepwater and swamp operations leadership. Oversees asset integrity and drilling execution.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS6ymxWTK2W6bZhEFhkcC9DuJXfQFDTcgHxYAj6pK1ORwEfAXzJ9y0_PrShitPCm0Hhh8NGyTdeIXaZ2DjJ0qrPA84yYQDZ8JDEikdLmgGqwtckwaKmlGaAC5vg18gRXR-eNmU4nHD3MTdpJsvIYI6xquXIxt57s2dpyaKk1-1de-QaCsmJiatRIOxk2RFaKwa03GBGftwMJPN-H84IlVWt7S0QmgOgP7dAC3F532B4Ufssmz46iSG',
          orderIndex: 2,
        },
        {
          firstName: 'Engr. Robert',
          lastName: 'Chen',
          position: 'Head of Subsurface & Reservoir Engineering',
          category: 'OPERATING_COMMITTEE',
          bio: 'Subsurface reservoir dynamic modeling specialist guiding field development plans for PPL 244 and PPL 227.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABY707BbfLwzK-bQ0lAOeV_RkfuCWRNW-E-DRHiwjHWTB2KV_AV75zyrYDCt4CUrCSYOCJwE0Qt-PnIsTa5GbYQlBj5xO9ZkBT9H99xEH2mj61rsnBlgNVxuX6X5Apw2ZpWIDRx7Ohd5tuQZVcVnxhDsggr60gjzz5Wrvuvit5nN7MMHDhUsBAcECrlTwGDBe4x_2Vu_K5xqs2fpIH5gfAx-NSev9K9uLM2xKabm2GpVO92tqhjamz',
          orderIndex: 3,
        },
        {
          firstName: 'Folashade',
          lastName: 'Adeleke',
          position: 'Chief Financial Officer',
          category: 'OPERATING_COMMITTEE',
          bio: 'Oversees capital budgeting, fiscal compliance under the Petroleum Industry Act (PIA), and upstream asset accounting.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUkx71CXls-oVVtpKiGayOY0xOR1LWGZ72q4ho0Ho_NpKNMLiT_dL9EwfmV2I2wCY8P7GOC-ItNT148wYz8yoJioapU7MysM0imq87k2B-iI1YbUx95Ez9aL990SuyQdNBXnGpHQf8MLfaKjuVVn-l2LiQUSJOlqZHR3t_LPlcUrlSKAWEfXNh_mkPRG__JgBYf_ognIpNzNyreBIUoX-6bReQVHV2l4ny_A1v4N5_pDcgMaTVzES2',
          orderIndex: 4,
        },
        {
          firstName: 'David',
          lastName: 'Okafor',
          position: 'General Manager, Assets & Production Operations',
          category: 'OPERATING_COMMITTEE',
          bio: 'Directs platform production, pipeline throughput integrity, and offshore logistics coordination.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1N9WUisOy-VCnG-Ga-rhkUyYH9rKY8jOI8z8bCIPCM5Siht0GCCN7osCuLJMAKb3rISkepS7YtakLnrYu7oxNL1Dweog89riESl4y_h0-rqrjtmVIVmej835hBp7GwcByYtt5rDr4OY6JxZx-9slge2VT5_wCLovV_QLQrYUFQlmeXYK7TuuzpxW-x0vy2kq-PN0nlb0b53XvMky8TkN7bZEzQChKfrbAqepXrL1zEPG3zqSmPwx4',
          orderIndex: 5,
        },
        {
          firstName: 'Elena',
          lastName: 'Rostova',
          position: 'Vice President, Strategy, ESG & Regulatory Affairs',
          category: 'OPERATING_COMMITTEE',
          bio: 'Steers environmental compliance, host community relations, and bilateral regulatory engagements with NUPRC.',
          profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB95N0keQ2usyNt9Os9GimSohS4i0TxpJXbXrg28jGspsRrDBpIrwWecAGYGWDeBhKmEfmrTBSjTy8H1MJaZCj6zYTUChSLRrNoMtLn8q267AR7T-pH2rsmnxqM2hyltt2eCoQjy-YtHZYERiac2RY3fJpBD9TYsG4A2IE0ulogOKiqEL4fEjanfykICMjAv_imsWZFVpE2gNycfvOCYhJPDaBsW1MvYImW1-ovgdbqh2NXWcMMSlge',
          orderIndex: 6,
        },
      ],
    });
  }

  // 6. Careers
  await prisma.career.upsert({
    where: { slug: 'lead-reservoir-engineer' },
    update: {},
    create: {
      id: 'car-01',
      slug: 'lead-reservoir-engineer',
      title: 'Lead Reservoir Engineer',
      department: 'Subsurface & Geosciences',
      location: 'Lagos / Offshore Akwa Ibom',
      employmentType: 'Full-Time',
      workType: 'Hybrid / Offshore Rotation',
      description: 'Lead dynamic reservoir simulation (Eclipse/Petrel), material balance modeling, and depletion planning.',
      requirements: 'Minimum 10 years experience in clastic offshore reservoirs.',
      isActive: true,
    },
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
