import React from 'react';
import { formatCurrency } from '../../lib/utils';

interface FlashCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: number | string;
}

export const FlashCard: React.FC<FlashCardProps> = ({ imageSrc, imageAlt, title, price }) => {
  return (
    <div className="border w-full p-3 flex items-center gap-3">
      <div className="">
        <img src={imageSrc} alt={imageAlt} className='w-20 h-10' />
      </div>
      <div className="flex flex-col w-full">
        <p className='font-light text-xs'>{title}</p>
        <p className="text-blue-400">{formatCurrency(Number(price))}</p>
      </div>
    </div>
  );
};