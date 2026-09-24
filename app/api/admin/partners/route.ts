import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_PARTNERS = [
  {
    id: "partner-1",
    name: "Brightwaters Energy",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289700/brightwaters.png",
    category: "Technical Partner",
    orderIndex: 1,
  },
  {
    id: "partner-2",
    name: "POAA Adit",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289303/poaadit_logo.png",
    category: "Technical Partner",
    orderIndex: 2,
  },
  {
    id: "partner-3",
    name: "Shelf Drilling",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/shelf_drilling.jpg",
    category: "Technical Partner",
    orderIndex: 3,
  },
  {
    id: "partner-4",
    name: "Spectrum Diagnostics",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/spectrum.jpg",
    category: "Technical Partner",
    orderIndex: 4,
  },
  {
    id: "partner-5",
    name: "Parker Hannifin",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/panel_parker.png",
    category: "Technical Partner",
    orderIndex: 5,
  },
  {
    id: "partner-6",
    name: "Halliburton",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/Halliburton.png",
    category: "Technical Partner",
    orderIndex: 6,
  },
  {
    id: "partner-7",
    name: "SLB (Schlumberger)",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/slb.png",
    category: "Technical Partner",
    orderIndex: 7,
  },
  {
    id: "partner-8",
    name: "Baker Hughes",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/Baker-Hughes-Logo-Symbol-PNG.png",
    category: "Technical Partner",
    orderIndex: 8,
  },
];

// Fallback in-memory cache if database table is empty or during offline dev
let inMemoryPartners = [...DEFAULT_PARTNERS];

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
    });
    if (partners && partners.length > 0) {
      return NextResponse.json({ success: true, partners });
    }
    return NextResponse.json({ success: true, partners: inMemoryPartners });
  } catch (error: any) {
    console.warn("Database fallback for partners:", error.message);
    return NextResponse.json({ success: true, partners: inMemoryPartners });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, logoUrl, website, category, orderIndex } = body;

    if (!logoUrl) {
      return NextResponse.json(
        { error: "Partner logo URL is required" },
        { status: 400 }
      );
    }

    const assignedOrder = orderIndex !== undefined ? parseInt(orderIndex) || 0 : inMemoryPartners.length + 1;
    const partnerName = name?.trim() || `Partner #${assignedOrder}`;
    const partnerCategory = category?.trim() || "TECHNICAL";

    try {
      const partner = await prisma.partner.create({
        data: {
          name: partnerName,
          logoUrl,
          website: website || null,
          category: partnerCategory,
          orderIndex: assignedOrder,
        },
      });
      return NextResponse.json({ success: true, partner });
    } catch (dbErr: any) {
      // In-memory fallback
      const newPartner = {
        id: `partner-${Date.now()}`,
        name: partnerName,
        logoUrl,
        website: website || null,
        category: partnerCategory,
        orderIndex: assignedOrder,
      };
      inMemoryPartners.push(newPartner);
      return NextResponse.json({ success: true, partner: newPartner });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, logoUrl, website, category, orderIndex } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    try {
      const updated = await prisma.partner.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(logoUrl && { logoUrl }),
          ...(website !== undefined && { website }),
          ...(category && { category }),
          ...(orderIndex !== undefined && { orderIndex: parseInt(orderIndex) || 0 }),
        },
      });
      return NextResponse.json({ success: true, partner: updated });
    } catch (dbErr: any) {
      // In-memory fallback
      const idx = inMemoryPartners.findIndex((p) => p.id === id);
      if (idx !== -1) {
        inMemoryPartners[idx] = {
          ...inMemoryPartners[idx],
          ...(name && { name }),
          ...(logoUrl && { logoUrl }),
          ...(website !== undefined && { website }),
          ...(category && { category }),
          ...(orderIndex !== undefined && { orderIndex: parseInt(orderIndex) || 0 }),
        };
        return NextResponse.json({ success: true, partner: inMemoryPartners[idx] });
      }
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    try {
      await prisma.partner.delete({ where: { id } });
      return NextResponse.json({ success: true, message: "Partner deleted" });
    } catch (dbErr: any) {
      inMemoryPartners = inMemoryPartners.filter((p) => p.id !== id);
      return NextResponse.json({ success: true, message: "Partner deleted" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
