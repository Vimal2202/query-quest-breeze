
import { Trademark } from '@/types/trademark';

// Mock data for trademarks
const mockTrademarks: Trademark[] = [
  {
    id: '73302505',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '73302505',
    registrationDate: '23 May 1983',
    status: 'live',
    statusDate: '25 Oct 2023',
    description: 'Retail Footwear and Apparel Store Services',
    class: '042',
    logo: '/lovable-uploads/14ced312-01d9-49d0-9b3a-83a41076cf58.png'
  },
  {
    id: '73345064',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '73345064',
    registrationDate: '22 Apr 1982',
    status: 'live',
    statusDate: '29 Sep 2023',
    description: 'ATHLETIC AND CASUAL CLOTHING FOR MEN, WOMEN AND CHILDREN, NAMELY SHIRTS...',
    class: '025',
  },
  {
    id: '87295796',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '87295796',
    registrationDate: '10 Jan 2017',
    status: 'live',
    statusDate: '16 May 2023',
    description: 'Entertainment services in the nature of organizing sporting events of...',
    class: '041',
  },
  {
    id: '86048388',
    name: 'NIKE',
    owner: 'Nike, Inc.',
    registrationNumber: '86048388',
    registrationDate: '26 Aug 2013',
    status: 'live',
    statusDate: '31 Jul 2021',
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
    owner: 'HILLERICH & BRADSBY CO., INC.',
    registrationNumber: '72034404',
    registrationDate: '22 Jul 1957',
    status: 'live',
    statusDate: '23 Feb 2018',
    description: 'MECHANICAL AND HYDRAULIC LIFTING JACKS, HYDRAULIC MOTORS, HYDRAULIC P...',
    class: '023',
  },
];

// Mock related terms
const mockRelatedTerms = ['nike', 'nine'];

export const searchTrademarks = async (query: string): Promise<{
  trademarks: Trademark[];
  relatedTerms: string[];
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
  };
};
