import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({ message: "API not available in static export. Using client-side fetching instead." });
}
