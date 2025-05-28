
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { amount, currency, orderId, type, bookingData, donationData } = await req.json();

    console.log('Processing payment for amount:', amount);
    console.log('Order ID:', orderId);
    console.log('Type:', type);

    // Here you would integrate with Razorpay/Paytm
    // For now, we'll simulate payment processing
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate payment success (you'd check actual payment status)
    const paymentSuccess = true;

    if (paymentSuccess) {
      if (type === 'pooja') {
        // Update pooja booking with payment details
        const { error } = await supabaseClient
          .from('pooja_bookings')
          .update({
            payment_status: 'completed',
            payment_id: paymentId
          })
          .eq('id', bookingData.id);

        if (error) throw error;
      } else if (type === 'donation') {
        // Update donation with payment details
        const { error } = await supabaseClient
          .from('donations')
          .update({
            payment_status: 'completed',
            payment_id: paymentId
          })
          .eq('id', donationData.id);

        if (error) throw error;
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          paymentId,
          message: 'Payment processed successfully' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Payment failed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
})
