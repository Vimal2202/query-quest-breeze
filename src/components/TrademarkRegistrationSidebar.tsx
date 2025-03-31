
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TrademarkRegistrationSidebar: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleCheckRegistrability = () => {
    setNameError(!brandName);
    setDescriptionError(!description);
    
    if (brandName && description) {
      console.log('Checking registrability for:', { brandName, description });
      // This would typically call an API endpoint
      alert(`Checking registrability for: ${brandName}`);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6 sticky top-4">
      <div className="flex items-center mb-4">
        <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 12 2 2 4-4" />
            <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
            <path d="M19 3h-1a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
            <path d="M12 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
            <path d="M17 15h-1a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" />
            <path d="M9.1 7.7H5.3a2 2 0 0 0-1.9 2.5l1.3 6a2 2 0 0 0 2 1.5h4.2" />
          </svg>
        </div>
        <h2 className="font-semibold text-base">AI Trademark Registrability</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="brandName"
            placeholder="Enter the name of the brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className={nameError ? "border-red-500" : ""}
          />
          {nameError && (
            <p className="text-xs text-red-500 mt-1">Name is required to proceed further</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Brand Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe the products and services related to the name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`min-h-[80px] ${descriptionError ? "border-red-500" : ""}`}
          />
          {descriptionError && (
            <p className="text-xs text-red-500 mt-1">Description is required to proceed further</p>
          )}
        </div>

        <Button 
          onClick={handleCheckRegistrability}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Check Registrability
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-base mb-4">Apply for Trademark</h3>
        
        <div className="text-sm text-gray-600 mb-4">
          Select countries to protect your logo trademark
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="trademarkName" className="block text-sm font-medium text-gray-700 mb-1">
              Trademark Name
            </label>
            <Input id="trademarkName" placeholder="nike" />
          </div>
          
          <div>
            <label htmlFor="countrySelect" className="block text-sm font-medium text-gray-700 mb-1">
              Country Selected
            </label>
            <div className="relative">
              <select 
                id="countrySelect" 
                className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="h-4 w-6" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              $99 + class + gov fee
            </div>
          </div>
          
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Apply Now
          </Button>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-base mb-4">Image Search</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <div className="mx-auto flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12 text-gray-400">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Drag and drop or upload to search any image
          </p>
          <div className="mt-4">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <span>Upload a file</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrademarkRegistrationSidebar;
