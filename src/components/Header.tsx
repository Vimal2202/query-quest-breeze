
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import NavigationTabs from './NavigationTabs';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-blue-900 text-2xl font-bold">
              Trademarkia
            </Link>
            <Link 
              to="/apply" 
              className="lg:hidden bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Apply for Trademark
            </Link>
          </div>
          
          <form onSubmit={handleSearch} className="w-full lg:max-w-xl flex gap-2">
            <div className="relative flex-grow">
              <Input
                type="text"
                className="pr-10 w-full"
                placeholder="Search trademark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
                aria-label="Image search"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <Search className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
          
          <div className="hidden lg:block">
            <Link 
              to="/apply" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Apply for Trademark
            </Link>
          </div>
        </div>
      </div>
      <NavigationTabs />
    </header>
  );
};

export default Header;
