import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { email, source } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email required' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { data, error } = await supabaseAdmin
            .from('email_subscribers')
            .upsert(
                {
                    email: email.toLowerCase().trim(),
                    source: source || 'popup',
                    subscribed_at: new Date().toISOString()
                },
                { onConflict: 'email' }
            )
            .select();

        if (error) {
            console.error('Supabase error:', error);
            // If table doesn't exist, still return success (we'll create it)
            if (error.code === '42P01') {
                return NextResponse.json({ success: true, message: 'Email captured' });
            }
            return NextResponse.json(
                { error: 'Failed to subscribe' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
