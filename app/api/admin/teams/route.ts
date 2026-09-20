import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: [{ category: "asc" }, { orderIndex: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ success: true, staff });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, position, category, bio, profileImage, orderIndex } = body;

    if (!firstName || !lastName || !position || !category) {
      return NextResponse.json(
        { error: "First name, last name, position, and category are required" },
        { status: 400 }
      );
    }

    const member = await prisma.staff.create({
      data: {
        firstName,
        lastName,
        position,
        category, // LEADERSHIP, OPERATING_COMMITTEE, BOARD
        bio: bio || null,
        profileImage: profileImage || null,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) || 0 : 0,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, firstName, lastName, position, category, bio, profileImage, orderIndex } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

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

    return NextResponse.json({ success: true, member: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.staff.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
