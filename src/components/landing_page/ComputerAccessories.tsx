
// import React, { useState, useEffect, useRef } from 'react';
// import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import TimerCard from '../ui/time-card';
// import { useBestSellerProducts, useCategories, useCategory, useSubcategoriesByCategory, useSubcategoryProducts } from '../../lib/api/product';
// import { LoadingSpinner } from '../ui/LoadingSpinner';
// import { Product } from '../../types';
// import useCartStore from '../../lib/store/useCartStore';
// import useWishlistStore from '../../lib/store/useWishlistStore';
// import Cookies from "js-cookie";
// import toast from 'react-hot-toast';
// import { ModalAuth } from '../ui/LoginSignupModal';
// import { ProductCard } from '../ui/ProductCard';

// const SubcategoryTabContent = ({ subcategory }: { subcategory: any }) => {
//   const { data: products = [], isLoading } = useSubcategoryProducts(subcategory.id);

//   if (isLoading) return <LoadingSpinner />;
//   if (products.length === 0) return <p className="text-sm text-gray-500 text-center my-10">No products in this subcategory.</p>;

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
//       {products.map((product: Product) => (
//         <ProductCard key={product.id} product={product} compact />
//       ))}
//     </div>
//   );
// };

// export const ComputerAccessories: React.FC = () => {
//   const { addToCart } = useCartStore();
//   const { addToWishlist, isInWishlist } = useWishlistStore();
//   const { data, isLoading, error } = useBestSellerProducts();
//   const { data: categories, isLoading: categoriesLoading } = useCategories();

//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const isLoggedIn = !!Cookies.get("access_token");
//   const userId = Cookies.get("userId");

//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   const handleAddToCart = async (product: Product) => {
//     const variation = product.variations?.find(v => v.quantity > 0);
//     if (!variation) return toast.error("No available variation for this product.");
//     await addToCart(product.id, variation.id);
//     toast.success("Added to cart!");
//   };

//   const handleAddToWishlist = async (product: Product) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     const availableVariation = product.variations?.find(v => v.quantity > 0);
//     if (!availableVariation) {
//       return toast.error("No available variation for this product.");
//     }

//     await addToWishlist({
//       userId: Number(userId),
//       productId: product.id,
//       productVariationId: availableVariation.id,
//       quantity: 1,
//     });

//     toast.success("Added to wishlist");
//   };

//   const {
//     data: allCategories,
//   } = useCategories();

//   const computingCategory = allCategories?.find((c: any) => c.name === 'Computing');
//   const categoryId = computingCategory?.id;

//   const {
//     data: category,
//   } = useCategory(categoryId);

//   const {
//     data: subcategories = [],
//   } = useSubcategoriesByCategory(categoryId);

//   const [activeTab, setActiveTab] = useState<number | null>(null);

// useEffect(() => {
//   if (subcategories.length > 0) {
//     setActiveTab(subcategories[0].id);
//   }
// }, [subcategories]);


//   console.log('Computing Category:', computingCategory);

//   useEffect(() => {
//     if (computingCategory?.subcategories?.length) {
//       setSelectedSubcategory(computingCategory.subcategories[0].name);
//     }
//   }, [computingCategory]);



//   if (isLoading || categoriesLoading) return <LoadingSpinner />;
//   if (error) return <p className="text-center">Failed to load featured products.</p>;

//   const products: Product[] = Array.isArray(data?.data) ? data.data.slice(0, 8) : [];

//   return (
//     <section className="flex flex-col lg:flex-row gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="w-full lg:w-[70%]">

//         <div className="flex justify-between gap-3 w-full h-fit items-center mb-4">
//           {/* <div className="flex gap-6 mb-6 overflow-x-auto">
//             {computingCategory?.subcategories?.map((subcategory: any, index: number) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setSelectedSubcategory(subcategory.name);
//                   scrollToProducts();
//                 }}
//                 className={`whitespace-nowrap px-4 py-2 rounded transition-colors ${
//                   selectedSubcategory === subcategory.name
//                     ? 'text-orange-500 border-b-2 border-orange-500'
//                     : 'text-gray-600 hover:text-orange-500'
//                 }`}
//               >
//                 {subcategory.name}
//               </button>
//             ))}
//           </div> */}

//           {subcategories.length === 0 ? (
//             <p className="text-gray-500 text-center">No subcategories or products found in this category.</p>
//           ) : (
//             <div className="flex flex-col gap-3 w-full h-fit items-center mb-4">
//               {/* Tab Headers */}
//               <div className="w-full flex items-center ">
//                 <h2 className="text-xl font-medium w-[30%] h-fit">Computer Accessories</h2>

//                 <div className="flex w-[70%] overflow-x-auto">
//                   {subcategories.map((sub: { id: number; name: string }) => (
//                     <button
//                       key={sub.id}
//                       className={`px-4 w-full py-2 text-sm font-medium rounded-t ${activeTab === sub.id
//                         ? 'border-b-2 border-orange-500'
//                         : 'hover:bg-yellow-50'
//                         }`}
//                       onClick={() => setActiveTab(sub.id)}
//                     >
//                       <span className='w-full whitespace-nowrap break-words '>{sub.name}</span>
//                     </button>
//                   ))}
//                 </div>

//               </div>

//               {/* Active Tab Content */}
//               {activeTab && <SubcategoryTabContent subcategory={subcategories.find((sub: { id: number; }) => sub.id === activeTab)} />}
//             </div>
//           )}
//         </div>

//         {/* <div ref={sectionRef} className="flex w-full gap-3 overflow-x-auto">
//           <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white overflow-hidden border h-full"
//                   onMouseEnter={() => setHoveredProduct(product.id)}
//                   onMouseLeave={() => setHoveredProduct(null)}
//                 >
//                   <div className="relative">
//                     <img
//                       src={product.images[0]?.image_url || 'https://via.placeholder.com/150'}
//                       alt={product.name}
//                       className="w-full h-32 object-contain"
//                     />
//                     {hoveredProduct === product.id && (
//                       <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
//                         <button
//                           onClick={() => handleAddToWishlist(product)}
//                           className={`p-2 ${isInWishlist(product.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'} rounded-full`}
//                           disabled={isInWishlist(product.id)}
//                         >
//                           <Heart className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//                         >
//                           <ShoppingCart className="h-5 w-5" />
//                         </button>
//                         <Link to={`/products/${product.id}`} className="block relative">
//                           <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
//                             <Eye className="h-5 w-5" />
//                           </button>
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-xs font-normal mb-2">{product.name}</h3>
//                     <span className="text-[#2DA5F3] font-normal text-sm">${product.selling_price}</span>
//                     {product.price > product.selling_price && (
//                       <span className="text-gray-400 text-sm line-through ml-2">${product.price}</span>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-4">No products found for this subcategory.</p>
//             )}
//           </div>
//         </div> */}
//       </div>

//       <div className="lg:w-[30%] w-full space-y-4">
//         <TimerCard />
//         <div className="bg-blue-900 text-white p-6 rounded-lg">
//           <h3 className="text-xl font-bold mb-2">37% DISCOUNT</h3>
//           <p className="mb-4">Only for SmartPhone products.</p>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">SHOP NOW →</button>
//         </div>
//       </div>

//       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
//     </section>
//   );
// };

import React, { useState, useEffect } from 'react';
import {  ArrowRight } from 'lucide-react';
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

const SubcategoryTabContent = ({ subcategoryId }: { subcategoryId: any }) => {
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
  const productQueries = subcategoryIds.map(id => useSubcategoryProducts(id));
  const isLoading = productQueries.some(query => query.isLoading);
  const allProducts = productQueries.flatMap(query => query.data || []);

  if (isLoading) return <LoadingSpinner />;
  if (allProducts.length === 0) return (
    <p className="text-sm text-gray-500 text-center my-10">
      No products available in this category.
    </p>
  );



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {allProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} compact />
      ))}
    </div>
  );
};

// export const ComputerAccessories: React.FC = () => {
//   const { addToCart } = useCartStore();
//   const { addToWishlist, isInWishlist } = useWishlistStore();
//   const { data: bestSellersData, isLoading: isLoadingBestSellers, error } = useBestSellerProducts();
//   const { data: categories, isLoading: categoriesLoading } = useCategories();

//   const [activeTab, setActiveTab] = useState<number | null>(0);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const isLoggedIn = !!Cookies.get("access_token");
//   const userId = Cookies.get("userId");

//   const computingCategory = categories?.find((c: any) => c.name === 'Computing');
//   const categoryId = computingCategory?.id;

//   const { data: subcategories = [] } = useSubcategoriesByCategory(categoryId);

//   const subcategoryIds = subcategories.map((sub: any) => sub.id);

//   useEffect(() => {
//     if (subcategoryIds.length > 0 && activeTab === null) {
//       setActiveTab(0);
//     }
//   }, [subcategoryIds]);

//   const handleAddToCart = async (product: Product) => {
//     const variation = product.variations?.find(v => v.quantity > 0);
//     if (!variation) return toast.error("No available variation for this product.");
//     await addToCart(product.id, variation.id);
//     toast.success("Added to cart!");
//   };

//   const handleAddToWishlist = async (product: Product) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     const variation = product.variations?.find(v => v.quantity > 0);
//     if (!variation) return toast.error("No available variation for this product.");

//     await addToWishlist({
//       userId: Number(userId),
//       productId: product.id,
//       productVariationId: variation.id,
//       quantity: 1,
//     });

//     toast.success("Added to wishlist");
//   };

//   if (isLoadingBestSellers || categoriesLoading) return <LoadingSpinner />;
//   if (error) return <p className="text-center">Failed to load products.</p>;

//   return (
//     <section className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="w-full lg:w-[70%]">
//         {subcategoryIds.length === 0 ? (
//           <p className="text-gray-500 text-center">No subcategories or products found in this category.</p>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {/* Tab Headers */}
//             <div className="flex items-center w-full">
//               <h2 className="text-xl font-medium w-[30%]">Computer Accessories</h2>
//               <div className="flex w-[70%] overflow-x-auto">
//                 <button
//                   className={`px-4 py-2 text-sm font-medium rounded-t ${
//                     activeTab === 0 ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
//                   }`}
//                   onClick={() => setActiveTab(0)}
//                 >
//                   All Products
//                 </button>
//                 {subcategories.map((sub: { id: number; name: string }) => (
//                   <button
//                     key={sub.id}
//                     className={`px-4 py-2 text-sm font-medium rounded-t ${
//                       activeTab === sub.id ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
//                     }`}
//                     onClick={() => setActiveTab(sub.id)}
//                   >
//                     <span className='whitespace-nowrap'>{sub.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Active Tab Content */}
//             {activeTab === 0 ? (
//               <AllSubcategoryProducts subcategoryIds={subcategoryIds} />
//             ) : (
//               activeTab && <SubcategoryTabContent subcategoryId={activeTab} />
//             )}
//           </div>
//         )}
//       </div>

//       <div className="lg:w-[30%] w-full space-y-4">
//         <TimerCard />
//         <div className="bg-blue-900 text-white p-6 rounded-lg">
//           <h3 className="text-xl font-bold mb-2">37% DISCOUNT</h3>
//           <p className="mb-4">Only for SmartPhone products.</p>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">SHOP NOW →</button>
//         </div>
//       </div>

//       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
//     </section>
//   );
// };




export const ComputerAccessories: React.FC = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const computingCategory = categories?.find((c: any) => c.name === 'Computing');
  const categoryId = computingCategory?.id;

  console.log('Computing Category:', computingCategory);

  const { data: subcategories = [] } = useSubcategoriesByCategory(categoryId);
  const [activeTab, setActiveTab] = useState<number | null>(0);

  // Fetch all subcategory products
  const subcategoryProductQueries = subcategories.map((sub: { id: string; }) =>
    useSubcategoryProducts(sub.id)
  );

  const subcategoriesWithProducts = subcategories.filter((_: any, index: any) =>
    subcategoryProductQueries[index].data?.length
  ).slice(0, 5); 

  const subcategoryIds = subcategories.map((sub: { id: any; }) => sub.id);

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
                className={`px-4 py-2 text-sm font-medium rounded-t ${activeTab === 0 ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
                  }`}
                onClick={() => setActiveTab(0)}
              >
                All Products
              </button>
              {subcategoriesWithProducts.map((sub: any) => (
                <button
                  key={sub.id}
                  className={`px-4 py-2 text-sm font-medium rounded-t ${activeTab === sub.id ? 'border-b-2 border-orange-500' : 'hover:bg-yellow-50'
                    }`}
                  onClick={() => setActiveTab(sub.id)}
                >
                  <span className="whitespace-nowrap">{sub.name}</span>
                </button>
              ))}

              <div className="text-center">
                <Link to={`/category/${computingCategory?.name}`}
                  className="text-orange-600 hover:underline text-xs w-full font-medium"
                >
                  View All Products <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* Active Tab Content */}
          {activeTab === 0 ? (
            <AllSubcategoryProducts subcategoryIds={subcategories.map((s: { id: any; }) => s.id)} />
          ) : (
            <>
              {activeTab && (
                <SubcategoryTabContent subcategoryId={subcategories.find((sub: { id: number; }) => sub.id === activeTab)} />
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