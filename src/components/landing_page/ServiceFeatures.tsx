import React from 'react';
import { Truck, Clock, Shield, HeadphonesIcon, Trophy, CreditCardIcon } from 'lucide-react';

export const ServiceFeatures: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "FFasted Delivery",
      description: "Delivery in 24/H"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "24 Hours Return",
      description: "100% money-back guarantee"
    },
    {
      icon: <CreditCardIcon className="h-6 w-6" />,
      title: "SECURE PAYMENT",
      description: "Your money is safe"
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "Support 24/7",
      description: "Live contact/message"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 border-r ">
            <div className="">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};