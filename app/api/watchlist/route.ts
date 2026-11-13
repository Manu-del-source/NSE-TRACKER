import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const entries = await prisma.watchlistEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { company: { select: { symbol: true, name: true, sector: true, status: true } } },
    });
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Watchlist read failed:", error);
    return NextResponse.json({ error: "Unable to load your watchlist." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => null) as { symbol?: string } | null;
  const symbol = body?.symbol?.trim().toUpperCase();
  if (!symbol || !/^[A-Z0-9.]{2,12}$/.test(symbol)) {
    return NextResponse.json({ error: "Enter a valid NSE ticker symbol." }, { status: 400 });
  }
  try {
    const company = await prisma.company.findUnique({ where: { symbol }, select: { id: true, symbol: true } });
    if (!company) return NextResponse.json({ error: "That symbol is not in the company directory yet." }, { status: 404 });
    const entry = await prisma.watchlistEntry.upsert({
      where: { userId_companyId: { userId, companyId: company.id } },
      create: { userId, companyId: company.id },
      update: {},
      include: { company: { select: { symbol: true, name: true, sector: true, status: true } } },
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("Watchlist create failed:", error);
    return NextResponse.json({ error: "Unable to save this symbol." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const symbol = new URL(request.url).searchParams.get("symbol")?.trim().toUpperCase();
  if (!symbol) return NextResponse.json({ error: "A symbol is required." }, { status: 400 });
  try {
    await prisma.watchlistEntry.deleteMany({ where: { userId, company: { symbol } } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Watchlist delete failed:", error);
    return NextResponse.json({ error: "Unable to remove this symbol." }, { status: 500 });
  }
}
