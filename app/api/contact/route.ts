import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, country, subject, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        firstName,
        lastName,
        email,
        country: country || "Nigeria",
        subject: subject || "General Inquiry",
        message,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully received.",
      inquiryId: inquiry.id,
    });
  } catch (error: any) {
    console.error("Error creating contact inquiry:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process contact inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
