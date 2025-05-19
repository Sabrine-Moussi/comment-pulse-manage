
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-event" />
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-event font-medium">
            Événements
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-event font-medium">
            À propos
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-event font-medium">
            Contact
          </Link>
          <div className="ml-4">
            <Link to="/admin">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span>Administration</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-2 py-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-event hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Événements
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-event hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-event hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-event hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Administration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
