
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Trademark } from '@/types/trademark';

interface TrademarkResultsProps {
  trademarks: Trademark[];
  relatedTerms: string[];
  searchTerm: string;
}

const TrademarkResults: React.FC<TrademarkResultsProps> = ({ 
  trademarks, 
  relatedTerms, 
  searchTerm 
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm mb-8">
      <div className="p-4 border-b border-gray-200">
        {relatedTerms.length > 0 && (
          <div className="mb-4">
            <h3 className="text-gray-600 text-sm mb-2">Also try searching for:</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((term, index) => (
                <Link 
                  key={index} 
                  to={`/search?q=${term}`}
                  className="inline-block px-3 py-1 border border-orange-300 rounded-full text-sm text-orange-500 hover:bg-orange-50 cursor-pointer"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-6 text-left text-gray-600 font-medium w-1/6">Mark</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium w-2/6">Details</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium w-1/6">Status</th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium w-2/6">Class/Description</th>
            </tr>
          </thead>
          <tbody>
            {trademarks.map((trademark) => (
              <tr key={trademark.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <td className="py-4 px-6 align-middle">
                  <div className="flex justify-center">
                    {trademark.logo ? (
                      <img src={trademark.logo} alt={trademark.name} className="h-16 w-16 object-contain" />
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="text-3xl font-serif text-gray-800">NIKE</div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-gray-800 mb-1">{trademark.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{trademark.owner}</div>
                  <div className="text-xs text-gray-500 mb-0.5">{trademark.registrationNumber}</div>
                  <div className="text-xs text-gray-500">{trademark.registrationDate}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm font-medium text-green-600">
                      Live/Registered
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    on {trademark.statusDate}
                  </div>
                  {trademark.nextRenewalDate && (
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                        {trademark.nextRenewalDate}
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 relative">
                  <div className="text-sm text-gray-800 pr-8">{trademark.description}</div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                      <span className="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <path d="M9 9h.01"></path>
                          <path d="M15 9h.01"></path>
                          <path d="M9 15h.01"></path>
                          <path d="M15 15h.01"></path>
                        </svg>
                      </span>
                      <span className="text-xs text-gray-600">Class {trademark.class}</span>
                    </div>
                    {trademark.classCode && (
                      <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 ml-2">
                        <span className="text-xs text-gray-600">Class {trademark.classCode}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrademarkResults;
