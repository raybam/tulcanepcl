import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    } = body;

    if (!firstName || !lastName || !email || !phoneNumber || !resumeUrl) {
      return NextResponse.json(
        { error: "First name, last name, email, phone number, and CV link are required." },
        { status: 400 }
      );
    }

    // Ensure or find corresponding Career record in DB
    let targetCareerId = careerId;
    const existingCareer = await prisma.career.findFirst({
      where: {
        OR: [{ id: careerId || "" }, { slug: careerSlug || "" }],
      },
    });

    if (existingCareer) {
      targetCareerId = existingCareer.id;
    } else {
      // Create career placeholder if not seeded
      const newCareer = await prisma.career.create({
        data: {
          id: careerId || "gen-" + Date.now(),
          title: careerSlug ? careerSlug.replace(/-/g, " ").toUpperCase() : "General Upstream Application",
          slug: careerSlug || "general-" + Date.now(),
          department: "Operations",
          employmentType: "Full-Time",
          workType: "Onsite/Rotation",
          description: "Technical position in upstream operations.",
          requirements: "Relevant engineering or geosciences qualifications.",
          isActive: true,
        },
      });
      targetCareerId = newCareer.id;
    }

    const application = await prisma.jobApplication.create({
      data: {
        careerId: targetCareerId,
        careerSlug: careerSlug || "general-application",
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

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      applicationId: application.id,
    });
  } catch (error: any) {
    console.error("Error creating job application:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit career application." },
      { status: 500 }
    );
  }
}
