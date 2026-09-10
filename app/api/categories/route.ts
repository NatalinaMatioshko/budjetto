import { NextResponse } from "next/server";
import { createCategorySchema } from "@/lib/validations";

/**
 * GET /api/categories — list categories (stub).
 * POST /api/categories — create category (validates body, stub).
 */
export async function GET() {
  return NextResponse.json({
    data: [],
    message: "Connect Prisma to return real categories.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: prisma.category.create(...)
    return NextResponse.json(
      { data: parsed.data, message: "Category validated (not persisted)." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
