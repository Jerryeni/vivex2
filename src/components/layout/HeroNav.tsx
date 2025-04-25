import { ChevronDown, Headphones, HelpCircle, MapPin, Phone, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCategories, useSubcategories } from '../../lib/api/product';

const CategoryDropdown: React.FC<{ isOpen: boolean; toggleDropdown: () => void }> = ({ isOpen, toggleDropdown }) => {
  const { data: categories, isLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);
  
  const { data: subcategories } = useSubcategories(selectedCategory || '');

  return (
    <div className={`absolute left-0 right-0 top-12 w-full mt-2 shadow-lg z-[999] bg-white rounded-md ${isOpen ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 w-full">
        {/* Main Categories */}
        <div className="col-span-1 bg-white rounded shadow-md py-3 w-full">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading categories...</p>
          ) : (
            <ul className="space-y-3">
              {categories?.map((category: { id: string; name: string }) => (
                <li
                  key={category.id}
                  className={`block text-sm font-light cursor-pointer px-4 py-2 rounded-md ${
                    selectedCategory === category.id ? 'bg-gray-100 font-bold' : 'text-gray-700'
                  } hover:text-orange-500`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Subcategories Section */}
        <div className="flex flex-col md:flex-row w-full gap-6 bg-white col-span-3 rounded shadow-md p-4">
          <div className="w-full">
            {selectedCategory && subcategories?.length ? (
              <ul className="space-y-2 w-full">
                {subcategories.map((subcat: { id: string; name: string }) => (
                  <li key={subcat.id} className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer px-4 py-2">
                    {subcat.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Select a category to see subcategories.</p>
            )}
          </div>

          {/* Promo Section */}
          <div className="h-fit bg-yellow-100 p-4 rounded-lg w-full">
            <h4 className="text-lg font-bold text-gray-800">21% Discount</h4>
            <p className="text-sm text-gray-700 my-2">
              Escape the noise, It's time to hear the magic with Xiaomi Earbuds.
            </p>
            <p className="text-sm text-gray-900 font-semibold">
              Starting price: <span className="text-orange-600">$99 USD</span>
            </p>
            <a
              href="#"
              className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between py-2 border-b w-full">
      <div className="flex flex-col md:flex-row items-center justify-start space-x-0 md:space-x-6 space-y-2 md:space-y-0 w-full">
        <div className="relative w-full">
          <button
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
            onClick={toggleDropdown}
          >
            <span>All Category</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {isDropdownOpen && <CategoryDropdown isOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
        </div>
        <div className="flex flex-wrap items-center justify-end space-x-6 text-sm text-gray-600">
          <a href="#" className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Track Order</span>
          </a>
          <a href="#" className="flex items-center space-x-1">
            <RefreshCw className="h-4 w-4" />
            <span>Compare</span>
          </a>
          <a href="#" className="flex items-center space-x-1">
            <Headphones className="h-4 w-4" />
            <span>Customer Support</span>
          </a>
          <a href="#" className="flex items-center space-x-1">
            <HelpCircle className="h-4 w-4" />
            <span>Need Help</span>
          </a>
        </div>
      </div>
      <div className="flex items-end justify-end space-x-2 mt-2 md:mt-0">
        <Phone className="h-4 w-4" />
        <span>+1-202-555-0104</span>
      </div>
    </div>
  );
};

export default HeroNav;
