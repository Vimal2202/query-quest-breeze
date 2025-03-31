
import React from 'react';
import { Link } from 'react-router-dom';

interface TabItem {
  id: string;
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
}

const NavigationTabs: React.FC = () => {
  const tabs: TabItem[] = [
    { id: 'trademarks', label: 'Trademarks', active: true },
    { id: 'owners', label: 'Owners', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ) },
    { id: 'logos', label: 'Logos', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ) },
    { id: 'search', label: 'Internet Brand Search', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ) },
    { id: 'copyrights', label: 'Copyrights', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9.354a4 4 0 1 0 0 5.292" />
      </svg>
    ) },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <div className="flex whitespace-nowrap py-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={`/${tab.id}`}
                className={`flex items-center px-4 py-2 mx-1 text-sm font-medium ${
                  tab.active
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
