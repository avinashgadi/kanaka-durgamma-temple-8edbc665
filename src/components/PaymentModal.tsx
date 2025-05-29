
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    upiUrl: string;
    upiId: string;
    amount: number;
    purpose: string;
    merchantName: string;
  };
}

const PaymentModal = ({ isOpen, onClose, paymentData }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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
    window.open(paymentData.upiUrl, '_blank');
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
          {/* Payment Details */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Amount:</span> ₹{paymentData.amount}</p>
              <p><span className="font-medium">Purpose:</span> {paymentData.purpose}</p>
              <p><span className="font-medium">Merchant:</span> {paymentData.merchantName}</p>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="text-center">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <div className="text-gray-500">
                <p className="font-medium mb-2">Scan QR Code with any UPI App</p>
                <div className="w-32 h-32 bg-white border rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-xs text-gray-400">QR Code</span>
                </div>
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Pay Now with UPI App
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Click "Pay Now" to open your UPI app and complete the payment
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">Payment Instructions:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Scan the QR code with any UPI app (PhonePe, GPay, Paytm, etc.)</li>
              <li>• Or copy the UPI ID and use it in your UPI app</li>
              <li>• Enter the amount ₹{paymentData.amount}</li>
              <li>• Complete the payment</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
