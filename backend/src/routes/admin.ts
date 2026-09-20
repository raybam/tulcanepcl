import { Router, Request, Response } from "express";
import { prisma } from "../config/db";

const router = Router();

// ==========================================
// 1. OVERVIEW & METRICS
// ==========================================
router.get("/overview", async (req: Request, res: Response) => {
  try {
    const [
      totalInquiries,
      unreadInquiries,
      totalApplications,
      totalBlogs,
      totalStaff,
      recentInquiries,
      recentApplications,
    ] = await Promise.all([
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { isRead: false } }),
      prisma.jobApplication.count(),
      prisma.blog.count(),
      prisma.staff.count(),
      prisma.contactInquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.jobApplication.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { career: true },
      }),
    ]);

    return res.json({
      success: true,
      stats: {
        totalInquiries,
        unreadInquiries,
        totalApplications,
        totalBlogs,
        totalStaff,
      },
      recentInquiries,
      recentApplications,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. CONTACT INQUIRIES
// ==========================================
router.get("/inquiries", async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json({ success: true, inquiries });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/inquiries", async (req: Request, res: Response) => {
  try {
    const { id, isRead } = req.body;
    if (!id) return res.status(400).json({ error: "Inquiry ID is required" });

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: { isRead: Boolean(isRead) },
    });
    return res.json({ success: true, inquiry: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/inquiries", async (req: Request, res: Response) => {
  try {
    const id = (req.query.id as string) || req.body.id;
    if (!id) return res.status(400).json({ error: "Inquiry ID is required" });

    await prisma.contactInquiry.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. JOB APPLICATIONS & CVs
// ==========================================
router.get("/applications", async (req: Request, res: Response) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { career: true },
    });
    return res.json({ success: true, applications });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/applications", async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "ID and status are required" });
    }

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
      include: { career: true },
    });
    return res.json({ success: true, application: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. BLOGS & NEWS CMS
// ==========================================
router.get("/blogs", async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    const categories = await prisma.blogCategory.findMany();
    return res.json({ success: true, blogs, categories });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/blogs", async (req: Request, res: Response) => {
  try {
    const { title, slug, description, content, featuredImage, categoryName, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const effectiveSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    let category = await prisma.blogCategory.findFirst({
      where: { name: categoryName || "Operations" },
    });

    if (!category) {
      category = await prisma.blogCategory.create({
        data: {
          name: categoryName || "Operations",
          slug: (categoryName || "operations").toLowerCase().replace(/\s+/g, "-"),
        },
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: effectiveSlug,
        description: description || null,
        content,
        featuredImage: featuredImage || null,
        categoryId: category.id,
        isPublished: isPublished ?? true,
        publishedAt: new Date(),
      },
      include: { category: true },
    });

    return res.status(201).json({ success: true, blog });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/blogs", async (req: Request, res: Response) => {
  try {
    const { id, title, description, content, featuredImage, isPublished } = req.body;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(isPublished !== undefined && { isPublished }),
      },
      include: { category: true },
    });

    return res.json({ success: true, blog: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/blogs", async (req: Request, res: Response) => {
  try {
    const id = (req.query.id as string) || req.body.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    await prisma.blog.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5. OUR TEAMS (Leadership & Operating Committee)
// ==========================================
router.get("/teams", async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }, { createdAt: "asc" }],
    });
    return res.json({ success: true, staff });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/teams", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, position, category, bio, profileImage, orderIndex } = req.body;

    if (!firstName || !lastName || !position || !category) {
      return res.status(400).json({
        error: "First name, last name, position, and category are required",
      });
    }

    const member = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        position,
        category,
        bio: bio || null,
        profileImage: profileImage || null,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) || 0 : 0,
      },
    });

    return res.status(201).json({ success: true, member });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/teams", async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, position, category, bio, profileImage, orderIndex } = req.body;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const updated = await prisma.staff.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(position && { position }),
        ...(category && { category }),
        ...(bio !== undefined && { bio }),
        ...(profileImage !== undefined && { profileImage }),
        ...(orderIndex !== undefined && { orderIndex: parseInt(orderIndex) || 0 }),
      },
    });

    return res.json({ success: true, member: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/teams", async (req: Request, res: Response) => {
  try {
    const id = (req.query.id as string) || req.body.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    await prisma.staff.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
