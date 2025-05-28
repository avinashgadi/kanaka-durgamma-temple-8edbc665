
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact us', path: '/contact' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Book Pooja', path: '/book-pooja' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              <span className="text-orange-500">FERTILIZER</span>
              <span className="text-orange-400">TOWNSHIP</span>
              <span className="text-white">CHARITABLETRUST</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Expenses Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setExpensesOpen(!expensesOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    isActive('/expenses')
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  Expenses
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {expensesOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to="/expenses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setExpensesOpen(false)}
                      >
                        View Expenses
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-orange-500 text-white'
                    : 'text-white hover:bg-orange-600 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/expenses"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-orange-600 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Expenses
            </Link>
            <button className="w-full text-left bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-md text-base font-medium transition-colors">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
