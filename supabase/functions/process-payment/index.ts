
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  type: 'donation' | 'pooja';
  donationData?: any;
  poojaData?: any;
  paymentMethod?: 'upi' | 'qr' | 'card';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, orderId, type, donationData, poojaData, paymentMethod }: PaymentRequest = await req.json();

    console.log('Processing payment:', { amount, currency, orderId, type, paymentMethod });

    // For now, we'll simulate the payment process
    // You can provide your PhonePe/GPay QR code and we'll integrate it properly
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate payment response
    const paymentResponse = {
      success: true,
      transactionId: `txn_${Date.now()}`,
      orderId: orderId,
      amount: amount,
      currency: currency,
      status: 'completed',
      paymentMethod: paymentMethod || 'upi',
      timestamp: new Date().toISOString(),
      // QR code data will be added when you provide your UPI details
      qrCode: paymentMethod === 'qr' ? {
        upiId: 'merchant@paytm', // Replace with your actual UPI ID
        amount: amount,
        note: `Payment for ${type} - ${orderId}`
      } : null
    };

    return new Response(JSON.stringify(paymentResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in process-payment function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
