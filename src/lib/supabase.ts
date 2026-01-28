import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side Supabase client (uses anon key with RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service role key, bypasses RLS)
// Only use this in server components and API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface AngelNumber {
  id: number;
  number: number;
  meaning: string;
  love: string;
  career: string;
  twin_flame: string;
  prediction_2026: string;
  lucky_color: string;
  chakra: string;
  what_to_do: string;
  why_seeing: string;
  misconception: string;
  money: string;
  pregnancy: string;
  soulmate: string;
  breakup: string;
  dreams: string;
  affirmation: string;
  created_at: string;
}

export async function getAngelNumber(num: number): Promise<AngelNumber | null> {
  const { data, error } = await supabaseAdmin
    .from('angel_numbers')
    .select('*')
    .eq('number', num)
    .single();

  if (error || !data) {
    return null;
  }

  return data as AngelNumber;
}

export async function getAllAngelNumbers(): Promise<number[]> {
  const { data, error } = await supabaseAdmin
    .from('angel_numbers')
    .select('number')
    .order('number');

  if (error || !data) {
    return [];
  }

  return data.map((d: { number: number }) => d.number);
}

export function transformAngelNumberData(data: AngelNumber) {
  return {
    number: data.number,
    meaning: data.meaning,
    love: data.love,
    career: data.career,
    twin_flame: data.twin_flame,
    '2026_prediction': data.prediction_2026,
    lucky_color: data.lucky_color,
    chakra: data.chakra,
    what_to_do: data.what_to_do,
    why_seeing: data.why_seeing,
    misconception: data.misconception,
    money: data.money,
    pregnancy: data.pregnancy,
    soulmate: data.soulmate,
    breakup: data.breakup,
    dreams: data.dreams,
    affirmation: data.affirmation,
  };
}
