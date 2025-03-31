
import React from 'react';
import { Button } from '@/components/ui/button';

const TrademarkFilters: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
      </Button>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Grid
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="21" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="21" y1="18" x2="3" y2="18" />
          </svg>
          List
        </Button>
      </div>
    </div>
  );
};

export default TrademarkFilters;
