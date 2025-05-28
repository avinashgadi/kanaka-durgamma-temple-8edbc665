
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const About = () => {
  const [activeTab, setActiveTab] = useState('information');

  const donationData = [
    { name: 'Donation Salary', value: 1992659, color: '#FF8C00' },
    { name: 'Donation Others', value: 227742, color: '#FFA500' },
    { name: 'Interest', value: 270079, color: '#FFB347' },
    { name: 'Income Golakh', value: 92290, color: '#FFCC80' }
  ];

  const expenseData = [
    { month: 'Jan', amount: 150000 },
    { month: 'Feb', amount: 120000 },
    { month: 'Mar', amount: 180000 },
    { month: 'Apr', amount: 90000 },
    { month: 'May', amount: 110000 },
    { month: 'Jun', amount: 85000 },
  ];

  const trustees = [
    'Shri GM Patel - Chairman',
    'Shri AJ Rajaskar - Secretary',
    'Shri PD Rindani - Treasurer',
    'Shri SA Desai - Member',
    'Shri MM Patel',
    'Shri MJ Acharya',
    'ShriPA Pandya',
    'Shri AN Gohil',
    'Shri HL Dandekar',
    'Shri MS Bhatt',
    'Shri SM Rathod',
    'Shri MB Desai'
  ];

  const tabs = [
    { id: 'information', label: 'INFORMATION' },
    { id: 'trustees', label: 'TRUSTEES' },
    { id: 'donators', label: 'DONATORS' },
    { id: 'expenses', label: 'EXPENSES' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">ABOUT US</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 mx-1 mb-2 rounded-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'information' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Temple Information</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Our Shiva Temple stands as a beacon of spirituality and devotion in the heart of GSFC Township. 
                  Established with the divine grace of Lord Shiva, this sacred space serves thousands of devotees 
                  who seek spiritual solace and divine blessings.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  The temple architecture follows traditional Vedic principles, creating a harmonious environment 
                  for prayer and meditation. Our daily rituals include morning and evening aarti, special poojas 
                  on auspicious days, and festivals celebrated with great devotion.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Temple Timings</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Morning Darshan: 6:00 AM - 12:00 PM</li>
                  <li>Evening Darshan: 4:00 PM - 9:00 PM</li>
                  <li>Special Poojas: As per temple calendar</li>
                  <li>Festival Times: Extended hours during festivals</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'trustees' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">NAME OF TRUSTEES ARE:</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-3">
                    {trustees.map((trustee, index) => (
                      <li key={index} className="text-gray-700 py-2 border-b border-gray-200">
                        {trustee}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg p-1">
                  <div className="bg-white rounded-lg p-6 h-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Trustee Responsibilities</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Overseeing temple operations</li>
                      <li>• Managing donations and expenses</li>
                      <li>• Organizing festivals and events</li>
                      <li>• Maintaining temple premises</li>
                      <li>• Ensuring transparent governance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donators' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">DONATIONS:</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Donation Breakdown</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">5% Income Golakh</span>
                      <span className="font-semibold">₹92,290</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">10% Donation through salary of employees</span>
                      <span className="font-semibold">₹19,92,659</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">12% Interest</span>
                      <span className="font-semibold">₹2,70,079</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">73% Donation by the worshippers</span>
                      <span className="font-semibold">₹22,77,742</span>
                    </li>
                  </ul>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {donationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Expenses</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="amount" fill="#FF8C00" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Expenses Breakdown</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Temple Maintenance</span>
                      <span className="font-semibold">₹45,000</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Priest Salaries</span>
                      <span className="font-semibold">₹30,000</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Utilities</span>
                      <span className="font-semibold">₹15,000</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Festival Expenses</span>
                      <span className="font-semibold">₹25,000</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Miscellaneous</span>
                      <span className="font-semibold">₹10,000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Preview */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-gray-300 h-40 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
