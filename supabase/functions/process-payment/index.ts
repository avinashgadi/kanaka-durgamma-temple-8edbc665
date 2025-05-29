
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  purpose: string;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, purpose, userDetails }: PaymentRequest = await req.json();

    console.log('Processing payment:', { amount, purpose, userDetails });

    // Generate UPI payment URL with your UPI ID
    const upiId = "gadhigopi147-3@oksbi";
    const merchantName = "Shiva Temple";
    
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(purpose)}`;

    // Generate QR code data
    const qrCodeData = {
      upiUrl,
      upiId,
      amount,
      purpose,
      merchantName
    };

    // Return payment response with UPI details
    return new Response(JSON.stringify({ 
      success: true,
      paymentMethod: "UPI",
      qrCode: qrCodeData,
      upiUrl: upiUrl,
      instructions: "Scan the QR code with any UPI app or click the UPI link to complete payment"
    }), {
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
