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
