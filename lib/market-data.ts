import { prisma } from "@/lib/prisma";

export type CompanyWithLatestQuote = {
  id: string;
  symbol: string;
  name: string;
  sector: string | null;
  status: string;
  latestQuote: {
    tradingDate: Date;
    closePrice: string | null;
    volume: string | null;
    currency: string;
  } | null;
};

export async function getCompanyDirectory(): Promise<{
  companies: CompanyWithLatestQuote[];
  databaseAvailable: boolean;
}> {
  try {
    const records = await prisma.company.findMany({
      where: { status: "ACTIVE" },
      orderBy: { symbol: "asc" },
      include: {
        quotes: {
          orderBy: { tradingDate: "desc" },
          take: 1,
          select: {
            tradingDate: true,
            closePrice: true,
            volume: true,
            currency: true,
          },
        },
      },
    });

    return {
      databaseAvailable: true,
      companies: records.map((company) => {
        const quote = company.quotes[0];
        return {
          id: company.id,
          symbol: company.symbol,
          name: company.name,
          sector: company.sector,
          status: company.status,
          latestQuote: quote
            ? {
                tradingDate: quote.tradingDate,
                closePrice: quote.closePrice?.toString() ?? null,
                volume: quote.volume?.toString() ?? null,
                currency: quote.currency,
              }
            : null,
        };
      }),
    };
  } catch (error) {
    console.error("Unable to load NSE company directory:", error);
    return { companies: [], databaseAvailable: false };
  }
}

export async function getCompanyBySymbol(symbol: string) {
  try {
    return await prisma.company.findUnique({
      where: { symbol: symbol.toUpperCase() },
      include: {
        quotes: {
          orderBy: { tradingDate: "desc" },
          take: 1,
        },
        ownershipEvents: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: [{ effectiveDate: "desc" }, { disclosedAt: "desc" }],
          take: 5,
          include: { investor: true, sourceDocument: true },
        },
        insiderDisclosures: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: [{ transactionDate: "desc" }, { disclosedAt: "desc" }],
          take: 5,
          include: { person: true, sourceDocument: true },
        },
      },
    });
  } catch (error) {
    console.error("Unable to load NSE company profile:", error);
    return null;
  }
}

export async function getMarketOverview() {
  try {
    const [latestQuoteDate, indices] = await Promise.all([
      prisma.marketQuote.findFirst({
        orderBy: { tradingDate: "desc" },
        select: { tradingDate: true },
      }),
      prisma.marketIndex.findMany({
        orderBy: { code: "asc" },
        include: {
          observations: {
            orderBy: { observationDate: "desc" },
            take: 1,
          },
        },
      }),
    ]);

    const totals = latestQuoteDate
      ? await prisma.marketQuote.aggregate({
          where: { tradingDate: latestQuoteDate.tradingDate },
          _sum: { turnover: true, volume: true },
          _count: { _all: true },
        })
      : null;

    return {
      databaseAvailable: true,
      tradingDate: latestQuoteDate?.tradingDate ?? null,
      quoteCount: totals?._count._all ?? 0,
      turnover: totals?._sum.turnover?.toString() ?? null,
      volume: totals?._sum.volume?.toString() ?? null,
      indices: indices.map((index) => {
        const observation = index.observations[0];
        return {
          code: index.code,
          name: index.name,
          observationDate: observation?.observationDate ?? null,
          value: observation?.value.toString() ?? null,
          changePercent: observation?.changePercent?.toString() ?? null,
        };
      }),
    };
  } catch (error) {
    console.error("Unable to load NSE market overview:", error);
    return {
      databaseAvailable: false,
      tradingDate: null,
      quoteCount: 0,
      turnover: null,
      volume: null,
      indices: [],
    };
  }
}

export async function getOwnershipLedger() {
  try {
    const [events, verifiedCount, pendingCount, issuerGroups] = await Promise.all([
      prisma.ownershipEvent.findMany({
        where: { verificationStatus: "VERIFIED" },
        orderBy: [{ effectiveDate: "desc" }, { disclosedAt: "desc" }],
        take: 100,
        include: { company: true, investor: true, sourceDocument: true },
      }),
      prisma.ownershipEvent.count({ where: { verificationStatus: "VERIFIED" } }),
      prisma.ownershipEvent.count({
        where: { verificationStatus: { in: ["PENDING", "NEEDS_REVIEW"] } },
      }),
      prisma.ownershipEvent.findMany({
        where: { verificationStatus: "VERIFIED" },
        distinct: ["companyId"],
        select: { companyId: true },
      }),
    ]);
    return { databaseAvailable: true, events, verifiedCount, pendingCount, issuerCount: issuerGroups.length };
  } catch (error) {
    console.error("Unable to load ownership ledger:", error);
    return { databaseAvailable: false, events: [], verifiedCount: 0, pendingCount: 0, issuerCount: 0 };
  }
}

export async function getInsiderLedger() {
  try {
    const [events, totalCount, issuerGroups, pendingCount] = await Promise.all([
      prisma.insiderDisclosure.findMany({
        where: { verificationStatus: "VERIFIED" },
        orderBy: [{ transactionDate: "desc" }, { disclosedAt: "desc" }],
        take: 100,
        include: { company: true, person: true, sourceDocument: true },
      }),
      prisma.insiderDisclosure.count({ where: { verificationStatus: "VERIFIED" } }),
      prisma.insiderDisclosure.findMany({
        where: { verificationStatus: "VERIFIED" },
        distinct: ["companyId"],
        select: { companyId: true },
      }),
      prisma.insiderDisclosure.count({
        where: { verificationStatus: { in: ["PENDING", "NEEDS_REVIEW"] } },
      }),
    ]);
    return { databaseAvailable: true, events, totalCount, issuerCount: issuerGroups.length, pendingCount };
  } catch (error) {
    console.error("Unable to load insider ledger:", error);
    return { databaseAvailable: false, events: [], totalCount: 0, issuerCount: 0, pendingCount: 0 };
  }
}
