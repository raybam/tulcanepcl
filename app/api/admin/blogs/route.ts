import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    const categories = await prisma.blogCategory.findMany();
    return NextResponse.json({ success: true, blogs, categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description, content, featuredImage, categoryName, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const effectiveSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    // Find or create category
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

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, slug, description, content, featuredImage, categoryName, isPublished } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    let categoryUpdate = {};
    if (categoryName) {
      let category = await prisma.blogCategory.findFirst({
        where: { name: categoryName },
      });
      if (!category) {
        category = await prisma.blogCategory.create({
          data: {
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }
      categoryUpdate = { categoryId: category.id };
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(isPublished !== undefined && { isPublished }),
        ...categoryUpdate,
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
