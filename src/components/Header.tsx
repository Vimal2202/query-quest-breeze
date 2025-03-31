
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-blue-900 text-2xl font-bold">
          Trademarkia
        </Link>
        <div className="hidden md:block">
          <Link 
            to="/apply" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Apply for Trademark
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
