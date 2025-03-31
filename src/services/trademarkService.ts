
import { Trademark } from '@/types/trademark';

// Shoe logos for Nike trademarks
const shoeLogo1 = '/lovable-uploads/8a176b12-8c4b-40f8-8864-5ed4df9a1dcf.png';
const shoeLogo2 = '/lovable-uploads/acca9676-d6f8-4524-8b35-b8847ccb8353.png';
const shoeLogo3 = '/lovable-uploads/54079ca7-3630-4de6-a841-d7d3f0a9c02a.png';

// Mock data for trademarks
const mockTrademarks: Trademark[] = [
  {
    id: '73302505',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '73302505',
    registrationDate: '23 Mar 1981',
    status: 'live',
    statusDate: '24 Oct 2023',
    description: 'Retail Footwear and Apparel Store Services',
    class: '042',
    logo: shoeLogo1
  },
  {
    id: '73345064',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '73345064',
    registrationDate: '22 Apr 1982',
    status: 'live',
    statusDate: '29 Sep 2023',
    description: 'ATHLETIC AND CASUAL CLOTHING FOR MEN, WOMEN AND CHILDREN, NAMELY SHIRT...',
    class: '025',
    logo: shoeLogo2
  },
  {
    id: '87295796',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '87295796',
    registrationDate: '10 Jan 2017',
    status: 'live',
    statusDate: '16 Mar 2023',
    description: 'Entertainment services in the nature of organizing sporting events of...',
    class: '041',
    logo: shoeLogo3
  },
  {
    id: '86048388',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '86048388',
    registrationDate: '26 Aug 2013',
    status: 'live',
    statusDate: '21 Jul 2021',
    description: 'Cell phone cases, parts and accessories for cell phones, namely...',
    class: '009',
  },
  {
    id: '76432654',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '76432654',
    registrationDate: '12 Dec 2006',
    status: 'live',
    statusDate: '09 May 2019',
    description: 'ear plugs for swimming purposes, nose clips for swimming purposes, swim...',
    class: '028',
  },
  {
    id: '72034404',
    name: 'NIKE',
    owner: 'REHOBOT HYDRAULICS AB',
    registrationNumber: '72034404',
    registrationDate: '22 Jul 1957',
    status: 'live',
    statusDate: '22 Feb 2018',
    description: 'MECHANICAL AND HYDRAULIC LIFTING JACKS, HYDRAULIC MOTORS, HYDRAULIC P...',
    class: '023',
  },
  {
    id: '74605806',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '74605806',
    registrationDate: '02 Dec 1994',
    status: 'live',
    statusDate: '24 Dec 2016',
    description: 'sports balls',
    class: '028',
    classCode: '028'
  },
];

// Mock related terms
const mockRelatedTerms = ['nike', 'nik'];

export const searchTrademarks = async (query: string): Promise<{
  trademarks: Trademark[];
  relatedTerms: string[];
  total: number;
}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const filteredTrademarks = query
    ? mockTrademarks.filter(tm => 
        tm.name.toLowerCase().includes(query.toLowerCase()) ||
        tm.description.toLowerCase().includes(query.toLowerCase())
      )
    : mockTrademarks;
    
  return {
    trademarks: filteredTrademarks,
    relatedTerms: mockRelatedTerms,
    total: 160, // Mock total number for the search results
  };
};
