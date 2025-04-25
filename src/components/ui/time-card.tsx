import React, { useState, useEffect } from 'react';

const TimerCard: React.FC = () => {
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
    <div key={label} className="text-center">
      <span className="block text-sm md:text-xl lg:text-4xl font-bold">{value || '00'}</span>
      <span className="block text-sm">{label}</span>
    </div>
  ));

  return (
    <div
      className="bg-contain bg-center p-8 rounded-lg text-center text-white max-w-md mx-auto"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1610348725531-843dff563e2c')",
      }}
    >
      <h3 className="text-lg font-semibold mb-2 tracking-widest">BEST DEALS</h3>
      <h1 className="text-4xl font-bold mb-6">Sale of the Month</h1>
      <div className="flex justify-center space-x-6 mb-8">
        {timerComponents}
      </div>
      <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold">
        Shop Now →
      </button>
    </div>
  );
};

export default TimerCard;