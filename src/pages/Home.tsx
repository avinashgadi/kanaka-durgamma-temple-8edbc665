
import { MapPin, Phone, Mail, Calendar, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-orange-400">HAR HAR</span><br />
              <span className="text-orange-300">MAHADEV</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Temple of Lord Shiva</p>
            <Link
              to="/about"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              MORE DETAILS
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ABOUT US</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Welcome to our sacred Shiva Temple, a divine sanctuary dedicated to Lord Shiva. 
                Our temple serves as a spiritual haven where devotees can connect with the divine, 
                participate in traditional rituals, and find peace in their spiritual journey.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are committed to preserving ancient traditions while serving our community 
                through various spiritual and social activities. Our temple is managed by dedicated 
                trustees who ensure that all activities are conducted with utmost devotion and transparency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  to="/donate"
                  className="flex items-center justify-between bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors"
                >
                  <span className="flex items-center">
                    <Heart className="mr-3 h-5 w-5" />
                    Make a Donation
                  </span>
                  <span>→</span>
                </Link>
                <Link
                  to="/book-pooja"
                  className="flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
                >
                  <span className="flex items-center">
                    <Calendar className="mr-3 h-5 w-5" />
                    Book Pooja
                  </span>
                  <span>→</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors"
                >
                  <span className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    Contact Temple
                  </span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Regular Devotees</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Poojas Performed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">₹10L+</h3>
              <p className="text-gray-600">Donations Received</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-300">
                Shiv Temple, SH 6, GSFC Township<br />
                Motikhavdi, Gujarat 361140
              </p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">temple.gsfc@gmail.com</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+91 9979862507</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
