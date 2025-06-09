// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useCategories, useCategory, useSubcategoriesByCategory, useSubcategoryProducts } from '../../../lib/api/product';
// import { Loader } from 'lucide-react';
// import { ProductCard } from '../../../components/ui/ProductCard';
// import { Product } from '../../../types';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import { ProductSkeleton } from '../../../components/ui/ProductSkeleton';

// const SubcategoryTabContent = ({ subcategory }: { subcategory: any }) => {
//   const { data: products = [], isLoading } = useSubcategoryProducts(subcategory.id);

//   if (isLoading) return <ProductSkeleton  />;
//   if (products.length === 0) return <p className="text-sm text-gray-500 text-center my-10">No products in this subcategory.</p>;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
//       {products.map((product: Product) => (
//         <ProductCard key={product.id} product={product} compact />
//       ))}
//     </div>
//   );
// };

// const CategoryPage = () => {
//   const { slug } = useParams();

//   const {
//     data: allCategories,
//     isLoading: isAllLoading,
//   } = useCategories();

//   const matchedCategory = allCategories?.find(
//     (cat: { name: string }) =>
//       cat.name.toLowerCase().replace(/\s+/g, '-') === slug?.toLowerCase()
//   );

//   const categoryId = matchedCategory?.id;

//   const {
//     data: category,
//     isLoading: isCategoryLoading,
//   } = useCategory(categoryId);

//   const {
//     data: subcategories = [],
//     isLoading: isSubLoading,
//   } = useSubcategoriesByCategory(categoryId);

//   const [activeTab, setActiveTab] = useState<number | null>(null);

//   React.useEffect(() => {
//     if (subcategories.length > 0 && activeTab === null) {
//       setActiveTab(subcategories[0].id);
//     }
//   }, [subcategories]);

//   if (isAllLoading || isCategoryLoading || isSubLoading)
//     return <ProductSkeleton  />;

//   if (!matchedCategory)
//     return <p className="text-center text-gray-500 py-20">Category not found.</p>;

//   return (
//     <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
//       <Breadcrumb items={[{ label: 'Category', href: `/category/${category?.name}` }]} />
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 bg-yellow/25 p-2 rounded text-center">
//         {category?.name}
//       </h1>

//       {subcategories.length === 0 ? (
//         <p className="text-gray-500 text-center">No subcategories or products found in this category.</p>
//       ) : (
//         <>
//           {/* Tab Headers */}
//           <div className="flex flex-wrap gap-2 justify-center mb-6 border-b border-gray-200">
//             {subcategories.map((sub: { id: number; name: string }) => (
//               <button
//                 key={sub.id}
//                 className={`px-4 py-2 text-sm font-medium rounded-t ${
//                   activeTab === sub.id
//                     ? 'bg-yellow-100 text-yellow-800 border-b-2 border-yellow-500'
//                     : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
//                 }`}
//                 onClick={() => setActiveTab(sub.id)}
//               >
//                 {sub.name}
//               </button>
//             ))}
//           </div>

//           {/* Active Tab Content */}
//           {activeTab && <SubcategoryTabContent subcategory={subcategories.find((sub: { id: number; }) => sub.id === activeTab)} />}
//         </>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useCategories,
  useCategory,
  useSubcategoriesByCategory,
  useSubcategoryProducts,
} from '../../../lib/api/product';
import { ProductCard } from '../../../components/ui/ProductCard';
import { Product } from '../../../types';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { ProductSkeleton } from '../../../components/ui/ProductSkeleton';

const SubcategoryTabContent = ({ subcategoryId }: { subcategoryId: any }) => {
  const { data: products = [], isLoading } = useSubcategoryProducts(subcategoryId);

  if (isLoading) return <ProductSkeleton />;
  if (products.length === 0)
    return <p className="text-sm text-gray-500 text-center my-10">No products in this subcategory.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} compact />
      ))}
    </div>
  );
};

const AllProductsTabContent = ({ subcategoryIds }: { subcategoryIds: any[] }) => {
  const all = subcategoryIds.map(id => useSubcategoryProducts(id));
  const isLoading = all.some(p => p.isLoading);
  const products = all.flatMap(p => p.data ?? []);

  if (isLoading) return <ProductSkeleton />;
  if (products.length === 0)
    return <p className="text-sm text-gray-500 text-center my-10">No products found in this category.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} compact />
      ))}
    </div>
  );
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { data: allCategories, isLoading: isAllLoading } = useCategories();

  const matchedCategory = allCategories?.find(
    (cat: { name: string }) =>
      cat.name.toLowerCase().replace(/\s+/g, '-') === slug?.toLowerCase()
  );

  const categoryId = matchedCategory?.id;
  const { data: category, isLoading: isCategoryLoading } = useCategory(categoryId);
  const { data: subcategories = [], isLoading: isSubLoading } = useSubcategoriesByCategory(categoryId);

  const [activeTab, setActiveTab] = useState<number>(0); // 0 = All Products

  useEffect(() => {
    if (subcategories.length > 0 && activeTab === null) {
      setActiveTab(0);
    }
  }, [subcategories]);

  if (isAllLoading || isCategoryLoading || isSubLoading) return <ProductSkeleton />;
  if (!matchedCategory)
    return <p className="text-center text-gray-500 py-20">Category not found.</p>;

  const subcategoryIds = subcategories.map((sub: any) => sub.id);

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <Breadcrumb items={[{ label: 'Category', href: `/category/${category?.name}` }]} />
      <h1 className="text-2xl font-bold text-gray-800 mb-6 bg-yellow/25 p-2 rounded text-center">
        {category?.name}
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-gray-500 text-center">No subcategories or products found in this category.</p>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-6 border-b border-gray-200">
            <button
              key={0}
              className={`px-4 py-2 text-sm font-medium rounded-t ${
                activeTab === 0
                  ? 'bg-yellow-100 text-yellow-800 border-b-2 border-yellow-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
              }`}
              onClick={() => setActiveTab(0)}
            >
              All
            </button>
            {subcategories
              .filter((_: any, index: number) => index < 4)
              .map((sub: { id: number; name: string }) => (
                <button
                  key={sub.id}
                  className={`px-4 py-2 text-sm font-medium rounded-t ${
                    activeTab === sub.id
                      ? 'bg-yellow-100 text-yellow-800 border-b-2 border-yellow-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                  }`}
                  onClick={() => setActiveTab(sub.id)}
                >
                  {sub.name}
                </button>
              ))}
          </div>

          {/* Tab Content */}
          {activeTab === 0 ? (
            <AllProductsTabContent subcategoryIds={subcategoryIds} />
          ) : (
            <SubcategoryTabContent subcategoryId={activeTab} />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
 