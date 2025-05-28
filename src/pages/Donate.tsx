
import { useState } from 'react';
import { Heart, CreditCard, Smartphone, QrCode } from 'lucide-react';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    anonymous: false,
    comments: ''
  });

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000'];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    alert(`Thank you for your donation of ₹${amount}! Redirecting to payment gateway...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Donation</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Giving is not just about making donation. It is about making difference.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                        selectedAmount === amount
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorInfo.firstName}
                    onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorInfo.lastName}
                    onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={donorInfo.address}
                  onChange={(e) => setDonorInfo({...donorInfo, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={donorInfo.city}
                    onChange={(e) => setDonorInfo({...donorInfo, city: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    value={donorInfo.zipCode}
                    onChange={(e) => setDonorInfo({...donorInfo, zipCode: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={donorInfo.country}
                    onChange={(e) => setDonorInfo({...donorInfo, country: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Privacy Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={donorInfo.anonymous}
                  onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
                  No, please keep my information anonymous
                </label>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Comments
                </label>
                <textarea
                  rows={4}
                  value={donorInfo.comments}
                  onChange={(e) => setDonorInfo({...donorInfo, comments: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add any comments about your donation..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
              >
                Donate ₹{customAmount || selectedAmount || '0'}
              </button>
            </form>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Secure payment with your card</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Smartphone className="h-6 w-6 text-green-600 mr-4" />
                  <div>
                    <p className="font-semibold">UPI Payment</p>
                    <p className="text-sm text-gray-600">Pay with UPI ID/Mobile Number</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <QrCode className="h-6 w-6 text-purple-600 mr-4" />
                  <div>
                    <p className="font-semibold">QR Code</p>
                    <p className="text-sm text-gray-600">Scan the QR code with any UPI app</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Temple Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">How Your Donation Helps</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Daily temple maintenance and upkeep
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Supporting priests and temple staff
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Organizing festivals and religious events
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Community service and charitable activities
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Preserving cultural and spiritual heritage
                </li>
              </ul>
            </div>

            {/* Tax Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-2">Tax Benefits</h4>
              <p className="text-blue-700 text-sm">
                Donations to our temple are eligible for tax deduction under Section 80G of the Income Tax Act. 
                You will receive a donation receipt for tax purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
