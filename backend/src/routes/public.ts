import { Router, Request, Response } from "express";
import { prisma } from "../config/db";

const router = Router();

// ==========================================
// 1. PUBLIC CONTACT INQUIRY
// ==========================================
router.post("/contact", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, country, subject, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: "First name, last name, email, and message are required",
      });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        firstName,
        lastName,
        email,
        country: country || "Nigeria",
        subject: subject || "General Technical Inquiry",
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been received. Our corporate team will contact you shortly.",
      inquiry,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. PUBLIC CAREER APPLICATION
// ==========================================
router.post("/careers/apply", async (req: Request, res: Response) => {
  try {
    const {
      careerId,
      careerSlug,
      firstName,
      lastName,
      email,
      phoneNumber,
      linkedin,
      resumeUrl,
      personalSummary,
    } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !resumeUrl) {
      return res.status(400).json({
        error: "First name, last name, email, phone number, and resume URL are required",
      });
    }

    let career = null;
    if (careerId) {
      career = await prisma.career.findUnique({ where: { id: careerId } });
    }

    if (!career && careerSlug) {
      career = await prisma.career.findUnique({ where: { slug: careerSlug } });
    }

    if (!career) {
      career = await prisma.career.findFirst({ where: { isActive: true } });
    }

    if (!career) {
      career = await prisma.career.create({
        data: {
          id: "gen-app",
          slug: careerSlug || "general-engineering-application",
          title: "General Engineering Application",
          department: "Operations & Subsurface",
          employmentType: "Full-Time",
          workType: "Hybrid",
          description: "General speculative application for upstream engineering and operations.",
          requirements: "Relevant engineering degree or industry technical qualification.",
          isActive: true,
        },
      });
    }

    const application = await prisma.jobApplication.create({
      data: {
        careerId: career.id,
        careerSlug: career.slug,
        firstName,
        lastName,
        email,
        phoneNumber,
        linkedin: linkedin || null,
        resumeUrl,
        personalSummary: personalSummary || null,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully. Our HR talent team will review your profile.",
      application,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. PUBLIC READ ENDPOINTS (OPTIONAL)
// ==========================================
router.get("/blogs", async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    });
    return res.json({ success: true, blogs });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/teams", async (_req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }],
    });
    return res.json({ success: true, staff });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
