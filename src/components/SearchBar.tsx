
import React, { useState } from 'react';
import { Search, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            aria-label="Image search"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Search className="mr-1 h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
