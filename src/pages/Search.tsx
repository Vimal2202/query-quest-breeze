
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, Share2, Filter } from 'lucide-react';
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
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
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
      const { trademarks, relatedTerms, total } = await searchTrademarks(searchQuery);
      setTrademarks(trademarks);
      setRelatedTerms(relatedTerms);
      setTotalResults(total || trademarks.length);
      setTotalPages(Math.ceil((total || trademarks.length) / 10));
      
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real application, you would fetch data for the new page
    // fetchTrademarks(query, page);
  };

  return (
    <div className="min-h-screen bg-white">
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
          <div className="flex justify-between items-center my-4">
            <h2 className="text-gray-700 text-lg">
              About <span className="font-semibold">{totalResults}</span> Trademarks found for "{query}"
            </h2>
            <div className="flex items-center space-x-4">
              <button className="bg-white p-2 border border-gray-200 rounded flex items-center">
                <Filter size={16} className="mr-2" />
                <span>Filters</span>
              </button>
              <button className="bg-white p-2 border border-gray-200 rounded">
                <Share2 size={16} />
              </button>
              <button className="bg-white p-2 border border-gray-200 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="8" x2="16" y1="8" y2="8"/><line x1="8" x2="16" y1="16" y2="16"/></svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TrademarkResults 
                trademarks={trademarks} 
                relatedTerms={relatedTerms}
                searchTerm={query}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 mb-10">
                  <div className="flex items-center space-x-1">
                    <button 
                      className="p-2 border rounded-md"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(1)}
                    >
                      <ChevronsLeft size={18} />
                    </button>
                    <button 
                      className="p-2 border rounded-md"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="px-4 py-2 border rounded-md bg-gray-50">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button 
                      className="p-2 border rounded-md"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                    <button 
                      className="p-2 border rounded-md"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      <ChevronsRight size={18} />
                    </button>
                    <button className="p-2 border rounded-md">
                      <ArrowUp size={18} />
                    </button>
                  </div>
                </div>
              )}
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

      {/* Footer - Only show when we have results */}
      {query && !loading && (
        <footer className="mt-20 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1">
                <div className="text-blue-900 text-2xl font-bold mb-4">Trademarkia</div>
                <p className="text-sm text-gray-600 mb-4">
                  World's #1 website to register your trademark and protect your brand, name, logo or slogan
                </p>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Social Links</h3>
                  <div className="flex space-x-3">
                    <a href="#" className="p-2 border rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                      </svg>
                    </a>
                    <a href="#" className="p-2 border rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </a>
                    <a href="#" className="p-2 border rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                    <a href="#" className="p-2 border rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Trusted Reviews</h3>
                  <div className="flex space-x-4 items-center">
                    <div className="text-center">
                      <div className="font-bold">4.7 / 5</div>
                      <img src="https://www.trademarkia.com/images/trust-pilot.png" alt="Trust Pilot" className="h-6" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold">4.8 / 5</div>
                      <img src="https://www.trademarkia.com/images/google-review.png" alt="Google Review" className="h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-md w-full mb-3">
                    Apply for trademark
                  </button>
                  <button className="border border-gray-300 px-6 py-3 rounded-md w-full mb-3">
                    Schedule Consult
                  </button>
                  <a href="#" className="text-blue-600 text-sm">See our plans and pricing</a>
                </div>
              </div>
              
              <div className="col-span-1">
                <h3 className="font-bold text-lg mb-4">Services</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Trademark Registration</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Comprehensive Trademark Search</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Trademark Services</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Trademark Classes</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">International Trademark Registration</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">File a Copyright</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Trademark Renewal</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Statement of Use</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Office Action Response</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Browse Top 300 Companies</a></li>
                </ul>
              </div>
              
              <div className="col-span-1">
                <h3 className="font-bold text-lg mb-4">Search</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Free Trademark search</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Free Copyright Search</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Owner search</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Attorney Ranking Search</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Domain Search</a></li>
                </ul>
                
                <h3 className="font-bold text-lg mt-8 mb-4">Resources</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">News</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Frequently Asked Question</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Become An Influencer</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Bulk Data</a></li>
                </ul>
              </div>
              
              <div className="col-span-1">
                <h3 className="font-bold text-lg mb-4">Rankings</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Company Ranking</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Law Firms Ranking</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Attorney Ranking</a></li>
                </ul>
                
                <h3 className="font-bold text-lg mt-8 mb-4">Company</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">About us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Press Coverage</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms and Conditions</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Sitemap</a></li>
                </ul>
                
                <h3 className="font-bold text-lg mt-8 mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Call</div>
                      <div className="text-xs text-gray-600">+1 (877) 794-9311</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-blue-600 flex items-center">
                        Leave a message
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-10 pt-6 text-xs text-gray-500">
              <p>© All Rights Reserved by Trademarkia</p>
              <p className="mt-2">
                <strong>Disclaimer:</strong> The information contained in this website is provided for informational purposes only, and should not be construed as legal advice. Although Trademarkia is a law firm (the "Firm"), your use of this website does not establish an attorney-client relationship with the Firm. Such a relationship can only arise when both the Firm decides that it is willing and able to accept the engagement, after a conflict check and after a written retainer agreement is signed between you and the Firm. Your use of this website is also subject to our Terms of Use and Privacy Policy.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Search;
