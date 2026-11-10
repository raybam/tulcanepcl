import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const vacancies = await prisma.career.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    return NextResponse.json({ success: true, vacancies });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      department,
      location,
      employmentType,
      workType,
      salary,
      description,
      requirements,
      isActive,
    } = body;

    if (!title || !department) {
      return NextResponse.json(
        { error: "Title and Department are required" },
        { status: 400 }
      );
    }

    const effectiveSlug =
      (slug && slug.trim()) ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    const vacancy = await prisma.career.create({
      data: {
        title,
        slug: effectiveSlug,
        department,
        location: location || "Lagos / Offshore",
        employmentType: employmentType || "Full-Time",
        workType: workType || "Hybrid / Rotation",
        salary: salary || null,
        description: description || "",
        requirements: requirements || "",
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ success: true, vacancy });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      slug,
      department,
      location,
      employmentType,
      workType,
      salary,
      description,
      requirements,
      isActive,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updated = await prisma.career.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(department && { department }),
        ...(location !== undefined && { location }),
        ...(employmentType && { employmentType }),
        ...(workType && { workType }),
        ...(salary !== undefined && { salary }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ success: true, vacancy: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.career.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
