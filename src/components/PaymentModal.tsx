
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Check, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeout: () => void;
  paymentData: {
    upiUrl: string;
    upiId: string;
    amount: number;
    purpose: string;
    merchantName: string;
  };
}

const PaymentModal = ({ isOpen, onClose, onTimeout, paymentData }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(600);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Payment Session Expired",
            description: "Please restart the booking process.",
            variant: "destructive",
          });
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onTimeout, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(paymentData.upiId);
    setCopied(true);
    toast({
      title: "UPI ID Copied",
      description: "UPI ID has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayNow = () => {
    // Create UPI deep link that should redirect back to our website
    const returnUrl = encodeURIComponent(window.location.origin + '/payment-success');
    const upiDeepLink = `${paymentData.upiUrl}&ret=${returnUrl}`;
    
    // Try to open UPI app directly
    window.location.href = upiDeepLink;
    
    // Fallback: if UPI app doesn't open, show instructions
    setTimeout(() => {
      toast({
        title: "UPI App Not Found?",
        description: "Please manually copy the UPI ID and complete payment in your UPI app.",
      });
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-purple-800">
            Complete Your Payment
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Timer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2 text-red-700">
              <Timer className="h-4 w-4" />
              <span className="font-semibold">Time Remaining: {formatTime(timeLeft)}</span>
            </div>
            <p className="text-xs text-red-600 text-center mt-1">
              Session will expire automatically for security
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Amount:</span> ₹{paymentData.amount}</p>
              <p><span className="font-medium">Purpose:</span> {paymentData.purpose}</p>
              <p><span className="font-medium">Merchant:</span> {paymentData.merchantName}</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
              <div className="text-gray-700">
                <p className="font-medium mb-3">Scan QR Code with any UPI App</p>
                <div className="w-40 h-40 bg-white border rounded-lg mx-auto flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/c2a9c0e6-500e-447a-9e4f-34edfe04b604.png" 
                    alt="PhonePe QR Code" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Compatible with PhonePe, GPay, Paytm, and other UPI apps
                </p>
              </div>
            </div>
          </div>

          {/* UPI ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Or pay using UPI ID:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={paymentData.upiId}
                readOnly
                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUpiId}
                className="px-3"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePayNow}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Pay Now with UPI App
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Click "Pay Now" to open your UPI app. After payment, you'll be redirected back.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">Payment Instructions:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Scan the QR code with any UPI app (PhonePe, GPay, Paytm, etc.)</li>
              <li>• Or copy the UPI ID and use it in your UPI app</li>
              <li>• Enter the amount ₹{paymentData.amount}</li>
              <li>• Complete the payment within {formatTime(timeLeft)}</li>
              <li>• You'll be automatically redirected after payment</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
