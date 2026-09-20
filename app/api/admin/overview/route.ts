import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [inquiriesCount, unreadInquiries, applicationsCount, blogsCount, staffCount] =
      await Promise.all([
        prisma.contactInquiry.count(),
        prisma.contactInquiry.count({ where: { isRead: false } }),
        prisma.jobApplication.count(),
        prisma.blog.count(),
        prisma.staff.count(),
      ]);

    const recentInquiries = await prisma.contactInquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const recentApplications = await prisma.jobApplication.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const recentBlogs = await prisma.blog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    const teamMembers = await prisma.staff.findMany({
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }],
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalInquiries: inquiriesCount,
        unreadInquiries,
        totalApplications: applicationsCount,
        totalBlogs: blogsCount,
        totalStaff: staffCount,
      },
      recentInquiries,
      recentApplications,
      recentBlogs,
      teamMembers,
    });
  } catch (error: any) {
    console.error("Admin overview fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch admin overview" },
      { status: 500 }
    );
  }
}
