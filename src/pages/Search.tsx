
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import NavigationTabs from '@/components/NavigationTabs';
import SearchBar from '@/components/SearchBar';
import TrademarkResults from '@/components/TrademarkResults';
import TrademarkFilters from '@/components/TrademarkFilters';
import TrademarkRegistrationSidebar from '@/components/TrademarkRegistrationSidebar';
import { searchTrademarks } from '@/services/trademarkService';
import { Trademark } from '@/types/trademark';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [trademarks, setTrademarks] = useState<Trademark[]>([]);
  const [relatedTerms, setRelatedTerms] = useState<string[]>([]);
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      fetchTrademarks(query);
    } else {
      // Clear results if query is empty
      setTrademarks([]);
      setRelatedTerms([]);
    }
  }, [query]);

  const fetchTrademarks = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { trademarks, relatedTerms } = await searchTrademarks(searchQuery);
      setTrademarks(trademarks);
      setRelatedTerms(relatedTerms);
      
      if (trademarks.length === 0) {
        toast({
          title: "No results found",
          description: `No trademarks found for "${searchQuery}".`,
        });
      }
    } catch (error) {
      console.error('Error fetching trademarks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch trademark data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      toast({
        title: "Empty search",
        description: "Please enter a search term.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs />
      <SearchBar onSearch={handleSearch} initialValue={query} />
      
      {loading ? (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Searching for trademarks...</p>
        </div>
      ) : query ? (
        <div className="container mx-auto px-4">
          <TrademarkFilters />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TrademarkResults 
                trademarks={trademarks} 
                relatedTerms={relatedTerms}
                searchTerm={query}
              />
            </div>
            <div className="lg:col-span-1">
              <TrademarkRegistrationSidebar />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Trademark Database</h2>
            <p className="text-gray-600 mb-8">
              Enter a word, phrase, or design to search for trademarks. Find information about registered and pending trademarks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
