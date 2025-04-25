import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronDown, MapPin, RefreshCw, Headphones, HelpCircle, Phone } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HeroNav from '../layout/HeroNav';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <HeroNav />

        {/* Hero Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          <div className="md:col-span-2">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="relative h-60 md:h-[465px]">
                  <img
                    src="/hero.png"
                    alt="Best Deals"
                    className="w-full h-[514px] object-fitxx"
                  />
                  <div className="absolute bottom-12 right-12">
                      {/* <h2 className="text-3xl md:text-5xl font-bold mb-4">BEST DEALS</h2>
                      <p className="text-lg md:text-xl mb-6">ON HOME APPLIANCES</p> */}
                      <button className="bg-[#47B1E7] text-white px-6 md:px-8 py-2 md:py-3 rounded-md hover:bg-blue-700 transition-colors">
                        SHOP NOW →
                      </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="space-y-4 md:col-span-1">
            <div className="bg-green-800 rounded-lg overflow-hidden relative h-60 md:h-[225px]">
              <img
                src="/rect1.png"
                alt="Fresh & Healthy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 p-4 md:p-6 text-white ">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Fresh & Healthy<br />Organic Food</h3>
                <p className="mb-4  border-l border-l-[#679BFF] opacity-50x text-gray-300 pl-2">SALE UP TO<br /> <span className='text-white font-bold text-sm md:text-xl'>48% </span> OFF</p>
                <button className="bg-[#679BFF] text-white px-4 md:px-6 py-2 rounded-full">
                  Shop now →
                </button>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden relative h-60 md:h-[225px]">
              <div className="absolute inset-0 p-4 md:p-6">
                <span className="text-blue-600 text-sm">-- THE BEST PLACE TO PLAY</span>
                <h3 className="text-xl md:text-2xl font-bold mt-2">Xbox Consoles</h3>
                <p className="text-[10px] text-gray-600 mt-2">
                  Save up to 50% on select Xbox games<br />
                  Get 3 months of PC Game Pass for $2 USD
                </p>
                <button className="bg-orange-500 text-white px-4 md:px-6 py-2 rounded mt-4">
                  SHOP NOW →
                </button>
              </div>
              <img
                src="/img.png"
                alt="Xbox"
                className="absolute right-0 bottom-0 w-24 md:w-48 h-24 md:h-48 object-contain"
              />
              <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded">
                $299
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

