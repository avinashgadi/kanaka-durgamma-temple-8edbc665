
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your booking. Your pooja has been scheduled successfully.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-green-700 space-y-1 text-left">
            <li>• You will receive a confirmation email shortly</li>
            <li>• Please arrive 15 minutes before your scheduled time</li>
            <li>• Bring a valid ID for verification</li>
            <li>• Feel free to bring offerings like flowers and fruits</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          
          <Button
            onClick={() => navigate('/book-pooja')}
            variant="outline"
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Another Pooja
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          You will be automatically redirected to home in a few seconds
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
