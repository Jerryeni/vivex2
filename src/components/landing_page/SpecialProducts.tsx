import React, { useEffect, useState } from 'react';

export const SpecialProducts: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2025-01-09") - +new Date();
    let timeLeft: {
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ].map(({ label, value }) => (
    <div key={label} className="text-center bg-white p-4 rounded-md">
      <span className="block text-sm md:text-sm lg:text-2xl font-medium text-[#679BFF]">{value || '00'}</span>
      <span className="block text-sm">{label}</span>
    </div>
  ));
  return (
    <div className="bg-[#EDF0F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c" 
              alt="Fresh Vegetables" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="md:w-1/3 text-center my-8 md:my-0">
          <p className="text-gray-600 mb-6">Best deals</p>

            <h2 className="text-2xl font-bold mb-4">Our Special Products Deal of the Month</h2>
            <div className="flex justify-center space-x-4 mb-6">
              <div className="flex justify-center space-x-6 mb-8">
              {timerComponents}
           </div>
            </div>
            <button className="bg-[#679BFF] text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Shop Now
            </button>
          </div>

          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" 
              alt="Fresh Fruits" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};