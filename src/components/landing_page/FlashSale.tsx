import React from 'react';
import { FlashCard } from '../ui/flash-card';
import { useBestSellerProducts, useFlashSaleProducts, useNewArrivals, useTopRatedProducts } from '../../lib/api/product';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const FlashSale: React.FC = () => {
  // Fetch all required data separately
  const { data: flashSaleData, isLoading: flashSaleLoading, error: flashSaleError } = useFlashSaleProducts();
  const { data: bestSellersData, isLoading: bestSellersLoading, error: bestSellersError } = useBestSellerProducts();
  const { data: newArrivalsData, isLoading: newArrivalsLoading, error: newArrivalsError } = useNewArrivals();
  const { data: topRatedData, isLoading: topRatedLoading, error: topRatedError } = useTopRatedProducts();

  // Handle Loading & Error States
  if (flashSaleLoading || bestSellersLoading || newArrivalsLoading || topRatedLoading) return <LoadingSpinner />;
  if (flashSaleError || bestSellersError || newArrivalsError || topRatedError)
    return <p className='text-center'>Failed to load featured products.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* FLASH SALE SECTION */}
      <div className="flex flex-col gap-4">
        <p className="text-xl uppercase">flash sale today</p>
        {flashSaleData?.data.slice(0, 3).map((product: { id: React.Key | null | undefined; images: { image_url: any; }[]; name: string; price: string | number; }) => (
          <FlashCard
            key={product.id}
            imageSrc={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
            imageAlt={product.name}
            title={product.name}
            price={product.price}
          />
        ))}
      </div>

      {/* BEST SELLERS SECTION */}
      <div className="flex flex-col gap-4">
        <p className="text-xl uppercase">best sellers</p>
        {bestSellersData?.data.slice(0, 3).map((product: { id: React.Key | null | undefined; images: { image_url: any; }[]; name: string; price: string | number; }) => (
          <FlashCard
            key={product.id}
            imageSrc={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
            imageAlt={product.name}
            title={product.name}
            price={product.price}
          />
        ))}
      </div>

      {/* TOP RATED SECTION */}
      <div className="flex flex-col gap-4">
        <p className="text-xl uppercase">top rated</p>
        {topRatedData?.data.slice(0, 3).map((product: { id: React.Key | null | undefined; images: { image_url: any; }[]; name: string; price: string | number; }) => (
          <FlashCard
            key={product.id}
            imageSrc={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
            imageAlt={product.name}
            title={product.name}
            price={product.price}
          />
        ))}
      </div>

      {/* NEW ARRIVALS SECTION */}
      <div className="flex flex-col gap-4">
        <p className="text-xl uppercase">new arrivals</p>
        {newArrivalsData?.data.slice(0, 3).map((product: { id: React.Key | null | undefined; images: { image_url: any; }[]; name: string; price: string | number; }) => (
          <FlashCard
            key={product.id}
            imageSrc={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
            imageAlt={product.name}
            title={product.name}
            price={product.price}
          />
        ))}
      </div>

    </div>
  );
};