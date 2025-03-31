
import React from 'react';
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
    <div className="container mx-auto px-4 pb-10">
      <div className="bg-white rounded-md shadow-sm mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-gray-700 text-lg">
            About <span className="font-semibold">{trademarks.length}</span> Trademarks found for "{searchTerm}"
          </h2>
        </div>
        
        {relatedTerms.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-600 text-sm mb-2">Also try searching for:</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((term, index) => (
                <div key={index} className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">
                  {term}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm font-medium">
                <th className="py-3 px-4 text-left w-32">Mark</th>
                <th className="py-3 px-4 text-left">Details</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Class/Description</th>
              </tr>
            </thead>
            <tbody>
              {trademarks.map((trademark) => (
                <tr key={trademark.id} className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      {trademark.logo ? (
                        <img src={trademark.logo} alt={trademark.name} className="h-16 w-16 object-contain" />
                      ) : (
                        <div className="bg-gray-100 h-16 w-16 flex items-center justify-center text-xl font-bold text-gray-700">
                          {trademark.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-black">{trademark.name}</div>
                    <div className="text-sm text-gray-600">{trademark.owner}</div>
                    <div className="text-xs text-gray-500">{trademark.registrationNumber}</div>
                    <div className="text-xs text-gray-500">{trademark.registrationDate}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm font-medium text-green-600">
                        Live / Registered
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      on {trademark.statusDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-800">{trademark.description}</div>
                    <div className="text-xs text-gray-500 mt-2">Class {trademark.class}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrademarkResults;
