
import { useState } from 'react';
import { Calendar, Clock, User, Heart, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import AuthModal from '@/components/AuthModal';

const BookPooja = () => {
  const [selectedPooja, setSelectedPooja] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { user } = useAuth();
  const { toast } = useToast();

  const poojaServices = [
    {
      id: 'rudrabhishek',
      name: 'Rudrabhishek',
      duration: '2 hours',
      price: 1100,
      description: 'Complete Rudrabhishek with 11 types of offerings to Lord Shiva'
    },
    {
      id: 'mahamrityunjaya',
      name: 'Mahamrityunjaya Havan',
      duration: '1.5 hours',
      price: 851,
      description: 'Special havan for health, longevity and protection'
    },
    {
      id: 'abhishek',
      name: 'Daily Abhishek',
      duration: '30 minutes',
      price: 251,
      description: 'Simple abhishek with milk, water and flowers'
    },
    {
      id: 'special',
      name: 'Special Occasion Pooja',
      duration: '3 hours',
      price: 2100,
      description: 'Comprehensive pooja for special occasions and festivals'
    }
  ];

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!selectedPooja || !selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a pooja service, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const selectedService = poojaServices.find(p => p.id === selectedPooja);
      if (!selectedService) throw new Error('Selected service not found');

      // Create booking record
      const { data: booking, error: bookingError } = await supabase
        .from('pooja_bookings')
        .insert([{
          user_id: user.id,
          pooja_service: selectedService.name,
          booking_date: selectedDate,
          booking_time: selectedTime,
          full_name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          occasion: bookingDetails.occasion,
          special_requests: bookingDetails.specialRequests,
          amount: selectedService.price,
          payment_status: 'pending'
        }])
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Process payment
      const { data: paymentResult, error: paymentError } = await supabase.functions.invoke('process-payment', {
        body: {
          amount: selectedService.price,
          currency: 'INR',
          orderId: `booking_${booking.id}`,
          type: 'pooja',
          bookingData: booking
        }
      });

      if (paymentError) throw paymentError;

      if (paymentResult.success) {
        toast({
          title: "Booking Confirmed!",
          description: "Your pooja has been booked successfully. You will receive a confirmation email shortly.",
        });

        // Reset form
        setSelectedPooja('');
        setSelectedDate('');
        setSelectedTime('');
        setBookingDetails({
          name: '',
          email: '',
          phone: '',
          occasion: '',
          specialRequests: ''
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book pooja. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedService = poojaServices.find(p => p.id === selectedPooja);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Star className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Book Pooja</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Schedule your spiritual journey with our sacred pooja services
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pooja Services */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Pooja Service</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {poojaServices.map((pooja) => (
                  <div
                    key={pooja.id}
                    onClick={() => setSelectedPooja(pooja.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPooja === pooja.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{pooja.name}</h3>
                      <span className="text-purple-600 font-bold text-lg">₹{pooja.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pooja.duration}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{pooja.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Selection */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Choose time slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>
            
            {!user && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Please log in to continue with your booking.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occasion
                </label>
                <input
                  type="text"
                  placeholder="Birthday, Anniversary, etc."
                  value={bookingDetails.occasion}
                  onChange={(e) => setBookingDetails({...bookingDetails, occasion: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements..."
                  value={bookingDetails.specialRequests}
                  onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Processing...' : user ? 'Book Pooja & Pay' : 'Login to Book'}
              </button>
            </form>

            {/* Booking Summary */}
            {selectedService && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Booking Summary</h3>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><span className="font-medium">Service:</span> {selectedService.name}</p>
                  <p><span className="font-medium">Price:</span> ₹{selectedService.price}</p>
                  {selectedDate && <p><span className="font-medium">Date:</span> {selectedDate}</p>}
                  {selectedTime && <p><span className="font-medium">Time:</span> {selectedTime}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center text-blue-800 mb-8">Important Information</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Booking Guidelines</h4>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Advance booking of at least 24 hours required</li>
                <li>• Confirmation will be sent via email and SMS</li>
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>• Cancellations must be made 4 hours in advance</li>
                <li>• Dress code: Traditional attire preferred</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">What to Bring</h4>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Fresh flowers and fruits (optional)</li>
                <li>• Coconut for offering</li>
                <li>• Incense sticks</li>
                <li>• Any personal items for blessing</li>
                <li>• Valid ID for verification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      />
    </div>
  );
};

export default BookPooja;
