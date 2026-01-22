export interface ClickBankAnalyticsRow {
  dimensionValue: string;
  hopCount: number;
  saleCount: number;
  saleAmount: number;
  netSaleAmount: number;
  orderImpression: number;
  earningsPerHop: number;
}

export async function getClickBankStats(
  startDate: string,
  endDate: string,
  providedClerkKey?: string,
  providedDevKey?: string,
  role: 'AFFILIATE' | 'VENDOR' = 'AFFILIATE'
): Promise<ClickBankAnalyticsRow[]> {
  const clerkKey = providedClerkKey || process.env.CLICKBANK_API_KEY;
  const devKey = providedDevKey || process.env.CLICKBANK_DEV_KEY;
  const account = process.env.NEXT_PUBLIC_CLICKBANK_AFFILIATE_ID;

  if (!clerkKey || !account) {
    throw new Error('Missing ClickBank configuration. Please ensure Clerk API Key and affiliate ID are set.');
  }

  // Construct Authorization header
  // format: DEV-xxxx:API-xxxx
  let authHeader = '';
  if (devKey) {
    const formattedDev = devKey.startsWith('DEV-') ? devKey : `DEV-${devKey}`;
    const formattedClerk = clerkKey.startsWith('API-') ? clerkKey : `API-${clerkKey}`;
    authHeader = `${formattedDev}:${formattedClerk}`;
  } else {
    // Fallback to just Clerk key if no Dev key provided (though 1.3 usually needs both)
    authHeader = clerkKey.startsWith('API-') ? clerkKey : `API-${clerkKey}`;
  }

  const params = new URLSearchParams({
    account,
    startDate,
    endDate,
  });
  
  const columns = ['HOP_COUNT', 'SALE_COUNT', 'SALE_AMOUNT', 'NET_SALE_AMOUNT', 'ORDER_IMPRESSION', 'EARNINGS_PER_HOP'];
  columns.forEach(col => params.append('select', col));

  const finalUrl = `https://api.clickbank.com/rest/1.3/analytics/${role.toLowerCase()}/DATE?${params.toString()}`;

  const response = await fetch(
    finalUrl,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': authHeader,
      },
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    let errorMsg = response.statusText;
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // If not JSON, try text
      const text = await response.text().catch(() => '');
      if (text) errorMsg = text;
    }
    
    if (response.status === 401) {
      throw new Error('ClickBank Authentication Failed (401). Please verify both your Developer Key and Clerk Key.');
    }
    throw new Error(`ClickBank API error: ${errorMsg}`);
  }

  const data = await response.json();
  
  return (data.analyticsResultRow || []).map((row: any) => ({
    dimensionValue: row.dimensionValue,
    hopCount: row.data?.find((d: any) => d.name === 'HOP_COUNT')?.value || 0,
    saleCount: row.data?.find((d: any) => d.name === 'SALE_COUNT')?.value || 0,
    saleAmount: row.data?.find((d: any) => d.name === 'SALE_AMOUNT')?.value || 0,
    netSaleAmount: row.data?.find((d: any) => d.name === 'NET_SALE_AMOUNT')?.value || 0,
    orderImpression: row.data?.find((d: any) => d.name === 'ORDER_IMPRESSION')?.value || 0,
    earningsPerHop: row.data?.find((d: any) => d.name === 'EARNINGS_PER_HOP')?.value || 0,
  }));
}
