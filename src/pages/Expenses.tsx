
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const Expenses = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const monthlyExpenses = [
    { month: 'Jan 2024', maintenance: 45000, salaries: 30000, utilities: 15000, festivals: 25000, total: 115000 },
    { month: 'Feb 2024', maintenance: 40000, salaries: 30000, utilities: 12000, festivals: 35000, total: 117000 },
    { month: 'Mar 2024', maintenance: 50000, salaries: 32000, utilities: 18000, festivals: 45000, total: 145000 },
    { month: 'Apr 2024', maintenance: 42000, salaries: 30000, utilities: 14000, festivals: 20000, total: 106000 },
    { month: 'May 2024', maintenance: 38000, salaries: 31000, utilities: 16000, festivals: 30000, total: 115000 },
    { month: 'Jun 2024', maintenance: 35000, salaries: 30000, utilities: 13000, festivals: 15000, total: 93000 }
  ];

  const expenseCategories = [
    { name: 'Temple Maintenance', value: 250000, color: '#FF8C00', percentage: 40 },
    { name: 'Priest Salaries', value: 183000, color: '#4169E1', percentage: 29 },
    { name: 'Festival Expenses', value: 170000, color: '#32CD32', percentage: 27 },
    { name: 'Utilities', value: 88000, color: '#FF69B4', percentage: 14 },
    { name: 'Miscellaneous', value: 35000, color: '#9370DB', percentage: 6 }
  ];

  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <DollarSign className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Temple Expenses</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Transparent financial reporting of temple expenditures and budget allocation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">5% decrease from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Average</p>
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(totalExpenses / 6).toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-500">Based on 6 months data</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Largest Category</p>
                <p className="text-2xl font-bold text-gray-900">Maintenance</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-orange-500">40% of total expenses</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Status</p>
                <p className="text-2xl font-bold text-green-600">On Track</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-500">Within allocated budget</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Expenses Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Expenses Breakdown</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="maintenance" stackId="a" fill="#FF8C00" name="Maintenance" />
                  <Bar dataKey="salaries" stackId="a" fill="#4169E1" name="Salaries" />
                  <Bar dataKey="utilities" stackId="a" fill="#32CD32" name="Utilities" />
                  <Bar dataKey="festivals" stackId="a" fill="#FF69B4" name="Festivals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Categories Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Categories</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
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

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Expense Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Percentage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                      Temple Maintenance
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">₹2,50,000</td>
                  <td className="py-4 px-4">40%</td>
                  <td className="py-4 px-4 text-gray-600">Building repairs, cleaning, security, gardening</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-600 rounded mr-3"></div>
                      Priest Salaries
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">₹1,83,000</td>
                  <td className="py-4 px-4">29%</td>
                  <td className="py-4 px-4 text-gray-600">Monthly salaries for temple priests and staff</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                      Festival Expenses
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">₹1,70,000</td>
                  <td className="py-4 px-4">27%</td>
                  <td className="py-4 px-4 text-gray-600">Special poojas, decorations, prasadam distribution</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-pink-500 rounded mr-3"></div>
                      Utilities
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">₹88,000</td>
                  <td className="py-4 px-4">14%</td>
                  <td className="py-4 px-4 text-gray-600">Electricity, water, gas, telephone bills</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-600 rounded mr-3"></div>
                      Miscellaneous
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold">₹35,000</td>
                  <td className="py-4 px-4">6%</td>
                  <td className="py-4 px-4 text-gray-600">Office supplies, travel, emergency expenses</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td className="py-4 px-4 font-bold">Total</td>
                  <td className="py-4 px-4 font-bold">₹{totalExpenses.toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold">100%</td>
                  <td className="py-4 px-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Financial Transparency Note */}
        <div className="bg-blue-50 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Financial Transparency</h3>
          <p className="text-blue-700 mb-4">
            We believe in complete transparency regarding the use of donations and temple funds. 
            All expenses are reviewed and approved by our board of trustees, and detailed financial 
            statements are available for review by any devotee upon request.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-semibold mb-2">Audit Information:</h4>
              <ul className="space-y-1">
                <li>• Annual external audit conducted</li>
                <li>• Financial records maintained as per law</li>
                <li>• Monthly trustee review meetings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact for Details:</h4>
              <ul className="space-y-1">
                <li>• Email: accounts@temple.gsfc.com</li>
                <li>• Phone: +91 9979862507</li>
                <li>• Office Hours: 10 AM - 4 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
