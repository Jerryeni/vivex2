import { ChevronDown, Headphones, HelpCircle, MapPin, Phone, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCategories, useSubcategories, useSubcategoriesByCategory, useSubcategoryProducts } from '../../lib/api/product';
import { FlashCard } from '../ui/flash-card';
import { useNavigate } from 'react-router-dom';


const CategoryDropdown: React.FC<{ isOpen: boolean; toggleDropdown: () => void }> = ({ isOpen, toggleDropdown }) => {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  // const { data: subcategories, isLoading: loadingSubcategories } = useSubcategories(selectedCategory || '');
  const { data: subcategories, isLoading: loadingSubcategories } = useSubcategoriesByCategory(selectedCategory);
  const { data: products, isLoading: loadingProducts } = useSubcategoryProducts(selectedSubcategory || '');

  const navigate = useNavigate();

  return (
    <div className={`absolute left-0 right-0 top-12 w-full mt-2 shadow-lg z-[999] bg-white rounded-md ${isOpen ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 w-full">

        {/* Categories */}
        <div className="col-span-1 bg-white border rounded shadow-md py-3">
          {loadingCategories ? (
            <p className="text-center text-gray-500">Loading categories...</p>
          ) : (
            <ul className="space-y-3">
              {categories?.map((category: { id: string; name: string }) => (
                <li
                  key={category.id}
                  className={`block text-sm font-light cursor-pointer px-4 py-2  ${selectedCategory === category.id ? 'bg-primary-100/10 font-bold' : 'text-gray-700'
                    } hover:text-orange-500`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSubcategory(null); // Reset subcategory selection
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Subcategories and Products */}
        <div className="col-span-3 flex flex-col gap-4 bg-white rounded shadow-md p-4">
          {/* Subcategories */}
          <div>
            {loadingSubcategories ? (
              <p className="text-gray-500">Loading subcategories...</p>
            ) : selectedCategory && subcategories?.length ? (
              <ul className="flex flex-wrap gap-3">
                {subcategories.map((subcat: { id: string; name: string }) => (
                  <li
                    key={subcat.id}
                    onClick={() => setSelectedSubcategory(subcat.id)}
                    className={`cursor-pointer text-sm px-3 py-1 border rounded-full ${selectedSubcategory === subcat.id ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 text-gray-700'
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
          {/* <hr /> */}

          {/* Products */}
          {selectedSubcategory && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Products</h4>
              {loadingProducts ? (
                <p className="text-gray-500">Loading products...</p>
              ) : products?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  {products.map((product: any) => (
                    // <div key={product.id} className="border p-3 rounded shadow-sm hover:shadow-md">
                    //   <img src={product.image} alt={product.name} className="w-full h-28 object-cover rounded" />
                    //   <h5 className="text-sm font-semibold mt-2">{product.name}</h5>
                    //   <p className="text-orange-500 font-bold text-sm">${product.price}</p>
                    // </div>
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)} // React Router
                      // onClick={() => router.push(`/product/${product.id}`)} // Next.js
                      className="cursor-pointer"
                    >
                      <FlashCard
                        key={product.id}
                        imageSrc={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                        imageAlt={product.name}
                        title={product.name}
                        price={product.price}
                      />
                      </div>
                  ))}
                    </div>
                  ) : (
                  <p className="text-gray-500">No products found in this subcategory.</p>
              )}

                  <div className="mt-4">
                    <a
                      href={`/subcategory/${selectedSubcategory}`}
                      className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600"
                    >
                      View All Products
                    </a>
                  </div>
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
