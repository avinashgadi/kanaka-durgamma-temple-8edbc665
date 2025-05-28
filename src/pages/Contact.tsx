
import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Let's get in touch</h1>
          <p className="text-xl opacity-90">We're here to help and answer any questions you might have</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                      Shiv Temple, SH 6, GSFC Township<br />
                      Motikhavdi, Gujarat 361140
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">temple.gsfc@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">9979862507</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Temple Timings</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">Morning Darshan:</span> 6:00 AM - 12:00 PM</p>
                <p><span className="font-semibold">Evening Darshan:</span> 4:00 PM - 9:00 PM</p>
                <p><span className="font-semibold">Special Occasions:</span> Extended hours</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-1">
            <div className="bg-white rounded-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name*"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your Email*"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Enter your phoneNumber*"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Enter your message*"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Placeholder) */}
      <div className="bg-gray-200 h-96">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Temple Location</h3>
          <p className="text-gray-600 mb-8">Find us on the map</p>
          <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Interactive Map Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
