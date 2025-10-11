export interface PurchaseSummary {
  batchId: {
    _id: string;
    name: string;
  };
  quantity: number;
  price: number;
  pricePerChick: number;
  dateOfPurchase: string;
}

export interface FeedSummary {
  batchId: {
    _id: string;
    name: string;
  };
  totalQuantity: number;
  totalPrices: number;
  updatedAt: string;
}

export interface VaccineSummary {
  batchId: {
    _id: string;
    name: string;
  };
  totalVaccineAmount: number;
  dateUpdated: string;
}

export interface SalesSummary {
  batchId: {
    _id: string;
    name: string;
  };
  totalNumSold: number;
  totalSaleAmount: number;
  lastUpdated: string;
}

export interface MortalitySummary {
  batchId: {
    _id: string;
    name: string;
  };
  totalMortalities: number;
  lastUpdated: string;
}

export interface ComputedSummary {
  batchId: BatchSummary;
  purchasedChicks: number;
  totalFeeds: number;
  totalFeedsBag: number;
  totalVaccines: number;
  totalNumSold: number;
  totalMortality: number;
  remainingChicks: number;
  totalExpenses: number;
  revenue: number;
  capital: number;
  startDate: string;
  netProfit: number;
}
export interface BatchSummary {
  _id: string;
  name: string;
  startDate: string;
  endDate?: string;   // ✅ new field
}

export interface AllSummaries {
  batchId: BatchSummary;
  salesSummary: SalesSummary | null;
  feedSummary: FeedSummary | null;
  mortalitySummary: MortalitySummary | null;
  totalVaccineSummary: VaccineSummary | null;
  purchaseSummary: PurchaseSummary | null;
  computedSummary: ComputedSummary | null;
}
