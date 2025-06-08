import {
  ChevronDown,
  Headphones,
  HelpCircle,
  MapPin,
  Phone,
  RefreshCw,
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import {
  useCategories,
  useSubcategoriesByCategory,
  useSubcategoryProducts,
} from '../../lib/api/product';
import { FlashCard } from '../ui/flash-card';
import { useNavigate } from 'react-router-dom';

const CategoryDropdown: React.FC<{ isOpen: boolean; toggleDropdown: () => void }> = ({
  isOpen,
  toggleDropdown,
}) => {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const { data: subcategories, isLoading: loadingSubcategories } = useSubcategoriesByCategory(
    selectedCategory
  );

  const allSubcategoryIds = useMemo(() => {
    return subcategories?.map((sub: { id: any; }) => sub.id) || [];
  }, [subcategories]);

  const {
    data: subcategoryProducts,
    isLoading: loadingProducts,
  } = useSubcategoryProducts(
    selectedSubcategory === 'all' ? allSubcategoryIds.join(',') : selectedSubcategory
  );

  const navigate = useNavigate();

  // Featured discounted product
  const discountedProduct = subcategoryProducts?.find(
    (product: any) => product?.discount_price && product?.discount_price < product?.price
  );

  console.log('subcategoryProducts Product:', subcategoryProducts);

  return (
    <div
      className={`absolute left-0 right-0 top-12 w-[80%] mt-2 shadow-lg z-[999] bg-transparent rounded-md ${isOpen ? 'block' : 'hidden'
        }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6x w-full">
        {/* Categories */}
        <div className="col-span-1 bg-white border rounded shadow-md py-3">
          {loadingCategories ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-3">
              {categories?.map((category: { id: string; name: string }) => (
                <li
                  key={category.id}
                  className={`block text-sm font-light cursor-pointer px-4 py-2 ${selectedCategory === category.id
                      ? 'bg-primary-100/10 font-bold'
                      : 'text-gray-700'
                    } hover:text-orange-500`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory('all'); // Default to "All"
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Subcategories and Products */}
        <div className="col-span-3 flex flex-colx gap-4 bg-white border rounded shadow-md p-4">

          {/* Subcategories */}
          <div>
            {loadingSubcategories ? (
              <p className="text-gray-500">Loading subcategories...</p>
            ) : selectedCategory && subcategories?.length ? (
              <ul className="flex flex-col gap-3">
                <li
                  className={`cursor-pointer text-sm px-3 py-1 ${selectedSubcategory === 'all'
                      ? 'bg-gray-100 text-black rounded'
                      : 'hover:bg-orange-100 text-gray-700'
                    }`}
                  onClick={() => setSelectedSubcategory('all')}
                >
                  All
                </li>
                {subcategories.map((subcat: { id: string; name: string }) => (
                  <li
                    key={subcat.id}
                    onClick={() => setSelectedSubcategory(subcat.id)}
                    className={`cursor-pointer text-sm px-3 py-1 ${selectedSubcategory === subcat.id
                        ? 'bg-gray-100 text-black rounded'
                        : 'hover:bg-orange-100 text-gray-700'
                      }`}
                  >
                    {subcat.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No subcategories found.</p>
            )}
          </div>

          {/* Products */}
          {selectedSubcategory && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 uppercase">
                Featured{' '}
                {
                  categories?.find(
                    (cat: { id: string | null }) => cat.id === selectedCategory
                  )?.name
                }
              </h4>
              {loadingProducts ? (
                <p className="text-gray-500">Loading products...</p>
              ) : subcategoryProducts?.length ? (
                <div className="grid grid-cols-1  gap-4">
                  {subcategoryProducts.map((product: any) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="cursor-pointer"
                    >
                      <FlashCard
                        imageSrc={
                          product.images?.[0]?.image_url || 'https://via.placeholder.com/150'
                        }
                        imageAlt={product.name}
                        title={product.name}
                        price={product.price}
                      // discount={product.discount_price}
                      />
                    </div>
                  ))}
                  {/* Featured Discounted Product */}
                  {discountedProduct && (
                    <div className="border p-3 rounded shadow-sm bg-orange-50">
                      <h5 className="text-sm font-bold text-orange-600 mb-2">
                        Hot Deal!
                      </h5>
                      <FlashCard
                        imageSrc={
                          discountedProduct.images?.[0]?.image_url ||
                          'https://via.placeholder.com/150'
                        }
                        imageAlt={discountedProduct.name}
                        title={discountedProduct.name}
                        price={discountedProduct.price}
                      // discount={discountedProduct.discount_price}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No products found in this subcategory.</p>
              )}
            </div>
          )}
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
    <div className="w-full border-b py-3 px-4 md:px-6 bg-white">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    {/* Left Side - Grid layout for nav links */}
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 md:flex md:items-center md:space-x-6 md:gap-0">
        
        {/* All Category Dropdown */}
        <div className="col-span-2 md:col-auto">
          <button
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md text-center w-full md:w-auto"
            onClick={toggleDropdown}
          >
            <span className='text-center'>All Category</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <CategoryDropdown
                isOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
              />
            </div>
          )}
        </div>

        {/* Other nav links */}
        <a href="/track-order" className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>Track Order</span>
        </a>

        <a href="/support" className="flex items-center space-x-1">
          <Headphones className="h-4 w-4" />
          <span>Customer Support</span>
        </a>

        <a href="/faqs" className="flex items-center space-x-1">
          <HelpCircle className="h-4 w-4" />
          <span>Need Help</span>
        </a>
      </div>
    </div>

    {/* Right Side - Phone Number */}
    <div className="w-full flex items-center justify-start md:justify-end gap-2 text-sm text-gray-700">
      <Phone className="h-4 w-4" />
      <span>+1-202-555-0104</span>
    </div>
  </div>
</div>
  );
};

export default HeroNav;