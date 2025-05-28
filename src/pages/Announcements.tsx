
import { Calendar, MapPin, Clock, Users, Bell, Star } from 'lucide-react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      type: 'festival',
      title: 'Maha Shivratri Celebration 2024',
      date: '2024-03-08',
      time: '6:00 AM - 11:00 PM',
      location: 'Main Temple Complex',
      description: 'Join us for the grand celebration of Maha Shivratri with special poojas, abhishek, and cultural programs throughout the day.',
      highlights: ['24-hour continuous abhishek', 'Free prasadam for all devotees', 'Cultural programs in the evening'],
      priority: 'high'
    },
    {
      id: 2,
      type: 'event',
      title: 'Monthly Satsang',
      date: '2024-02-15',
      time: '7:00 PM - 9:00 PM',
      location: 'Community Hall',
      description: 'Monthly spiritual discourse and bhajan session with renowned speakers. All devotees are welcome.',
      highlights: ['Spiritual discourse by Pandit Ji', 'Community bhajan session', 'Refreshments provided'],
      priority: 'medium'
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Temple Renovation Update',
      date: '2024-02-10',
      time: 'All Day',
      location: 'East Wing',
      description: 'Renovation work in the east wing will continue for another two weeks. Some areas may have restricted access.',
      highlights: ['East wing partially closed', 'Main temple remains open', 'Expected completion: March 1st'],
      priority: 'low'
    },
    {
      id: 4,
      type: 'pooja',
      title: 'Special Rudrabhishek',
      date: '2024-02-20',
      time: '6:00 AM - 8:00 AM',
      location: 'Main Sanctum',
      description: 'Special Rudrabhishek ceremony for the prosperity and well-being of all devotees. Registration required.',
      highlights: ['Limited participation', 'Registration fee: ₹501', 'Prasadam included'],
      priority: 'medium'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'New Online Donation System',
      date: '2024-02-05',
      time: 'Ongoing',
      location: 'Website',
      description: 'We have launched a new secure online donation system for your convenience. Now you can contribute from anywhere.',
      highlights: ['Multiple payment options', 'Instant receipt generation', 'Mobile-friendly interface'],
      priority: 'medium'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'pooja': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="h-4 w-4 text-red-500" />;
      case 'medium': return <Bell className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Bell className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Announcements & Events</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Stay updated with all temple activities, festivals, and important information
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Star className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Important Notice</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Temple timings may vary during festival days. Please check individual event details or contact the temple office for specific timings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(announcement.priority)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(announcement.type)}`}>
                      {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3">{announcement.title}</h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{announcement.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    <span>{announcement.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-500" />
                    <span>All Devotees Welcome</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{announcement.description}</p>

                {/* Highlights */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                  <ul className="space-y-1">
                    {announcement.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-orange-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {announcement.type === 'pooja' && (
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Register for Pooja
                    </button>
                  )}
                  {announcement.type === 'festival' && (
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Festival Details
                    </button>
                  )}
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Share
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 mt-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter to receive the latest announcements and event updates directly in your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
