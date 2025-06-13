import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimerCard from '../ui/time-card';
import {
  useCategories,
  useSubcategoriesByCategory,
  useSubcategoryProducts
} from '../../lib/api/product';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Product } from '../../types';
import { ProductCard } from '../ui/ProductCard';

const SubcategoryTabContent = ({ subcategoryId, enabled }: { subcategoryId: any; enabled?: boolean }) => {
  const { data: products = [], isLoading } = useSubcategoryProducts(subcategoryId);

  if (isLoading) return <LoadingSpinner />;
  if (products.length === 0) return (
    <p className="text-sm text-gray-500 text-center my-10">
      No products in this subcategory.
    </p>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} compact />
      ))}
    </div>
  );
};

const AllSubcategoryProducts = ({ subcategoryIds }: { subcategoryIds: any[] }) => {
  const productQueries = subcategoryIds.map(id =>
    useSubcategoryProducts(id)
  );

  const isLoading = productQueries.some(query => query.isLoading || query.isFetching);
  const isSuccess = productQueries.every(query => query.isSuccess);
  const allProducts = productQueries.flatMap(query => query.data || []);

  if (!isSuccess || isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {allProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} compact />
      ))}
    </div>
  );
};

export const ComputerAccessories: React.FC = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const computingCategory = categories?.find((c: any) => c.name === 'Computing');
  const categoryId = computingCategory?.id;

  console.log('Computing Category:', computingCategory);

  const { data: subcategories = [] } = useSubcategoriesByCategory(categoryId);
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const subcategoriesWithProducts = subcategories.slice(0, 4);
  const subcategoryIds = subcategories.map((sub: { id: any }) => sub.id);

  useEffect(() => {
    if (subcategoryIds.length > 0 && activeTab === null) {
      setActiveTab(0);
    }
  }, [subcategoryIds]);

  return (
    <section className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full lg:w-[70%]">
        <div className="flex flex-col gap-3">
          {/* Tab Headers */}
          <div className="flex items-center ">
            <h2 className="text-xl font-medium w-[30%]">Computer Accessories</h2>
            <div className="flex w-[70%] overflow-x-auto items-center">
              <button
                className={`px-4 py-2 text-xs font-medium rounded-t ${
                  activeTab === 0 ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
                }`}
                onClick={() => setActiveTab(0)}
              >
                All Products
              </button>
              {subcategoriesWithProducts.map((sub: any) => (
                <button
                  key={sub.id}
                  className={`px-4 py-2 text-sm font-medium rounded-t ${
                    activeTab === sub.id ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
                  }`}
                  onClick={() => setActiveTab(sub.id)}
                >
                  <span className="whitespace-nowrap">{sub.name}</span>
                </button>
              ))}
              <div className="text-center">
                <Link
                  to={`/category/${computingCategory?.name}`}
                  className="text-orange-600 hover:underline text-xs w-full font-medium"
                >
                  View All <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Active Tab Content */}
          {activeTab === 0 ? (
            <AllSubcategoryProducts subcategoryIds={subcategoryIds} />
          ) : (
            <>
              {activeTab && (
                <SubcategoryTabContent
                  subcategoryId={subcategories.find((sub: { id: number }) => sub.id === activeTab)}
                  enabled={!!activeTab}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="lg:w-[30%] w-full space-y-4">
        <TimerCard />
        <div className="bg-blue-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">37% DISCOUNT</h3>
          <p className="mb-4">Only for SmartPhone products.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">SHOP NOW →</button>
        </div>
      </div>
    </section>
  );
};