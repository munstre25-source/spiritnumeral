'use server';

import { getClickBankStats, ClickBankAnalyticsRow } from '@/lib/utils/clickbank-api';

export async function fetchStatsAction(
  startDate: string,
  endDate: string,
  apiKey: string,
  devKey?: string
): Promise<{ success: boolean; data?: ClickBankAnalyticsRow[]; error?: string }> {
  try {
    // We pass the keys. If devKey is provided, we'll format the Authorization header accordingly in getClickBankStats
    // For now, let's modify getClickBankStats to handle both.
    
    // In a server action, we can also use environment variables if keys aren't provided
    const stats = await getClickBankStats(startDate, endDate, apiKey, devKey);
    return { success: true, data: stats };
  } catch (error: any) {
    console.error('ClickBank Action Error:', error);
    return { success: false, error: error.message || 'Failed to fetch ClickBank statistics' };
  }
}
