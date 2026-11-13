import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => null) as { isActive?: boolean } | null;
  if (typeof body?.isActive !== "boolean") return NextResponse.json({ error: "A valid active state is required." }, { status: 400 });
  const result = await prisma.alertRule.updateMany({ where: { id, userId }, data: { isActive: body.isActive } });
  if (!result.count) return NextResponse.json({ error: "Alert not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: Context) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const result = await prisma.alertRule.deleteMany({ where: { id, userId } });
  if (!result.count) return NextResponse.json({ error: "Alert not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
