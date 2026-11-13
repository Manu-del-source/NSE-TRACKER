import { auth } from "@clerk/nextjs/server";
import { AlertRuleType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const rules = await prisma.alertRule.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ rules });
  } catch (error) {
    console.error("Alert rule read failed:", error);
    return NextResponse.json({ error: "Unable to load alert rules." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => null) as { ruleType?: string; symbol?: string; threshold?: number } | null;
  const ruleType = body?.ruleType;
  if (!ruleType || !Object.values(AlertRuleType).includes(ruleType as AlertRuleType)) {
    return NextResponse.json({ error: "Choose a supported alert type." }, { status: 400 });
  }
  const symbol = body?.symbol?.trim().toUpperCase() || null;
  if (symbol && !/^[A-Z0-9.]{2,12}$/.test(symbol)) return NextResponse.json({ error: "Invalid ticker symbol." }, { status: 400 });
  const needsThreshold = ["PRICE_ABOVE", "PRICE_BELOW", "PRICE_CHANGE_PERCENT"].includes(ruleType);
  const threshold = needsThreshold ? Number(body?.threshold) : null;
  if (needsThreshold && (!Number.isFinite(threshold) || threshold === null || threshold <= 0 || threshold > 100000000)) {
    return NextResponse.json({ error: "Enter a valid positive threshold." }, { status: 400 });
  }
  if (["PRICE_ABOVE", "PRICE_BELOW", "PRICE_CHANGE_PERCENT"].includes(ruleType) && !symbol) {
    return NextResponse.json({ error: "A ticker symbol is required for price alerts." }, { status: 400 });
  }
  try {
    if (symbol) {
      const company = await prisma.company.findUnique({ where: { symbol }, select: { id: true } });
      if (!company) return NextResponse.json({ error: "That symbol is not in the company directory yet." }, { status: 404 });
    }
    const rule = await prisma.alertRule.create({
      data: { userId, ruleType: ruleType as AlertRuleType, symbol, threshold },
    });
    return NextResponse.json({ rule }, { status: 201 });
  } catch (error) {
    console.error("Alert rule create failed:", error);
    return NextResponse.json({ error: "Unable to save this alert." }, { status: 500 });
  }
}
