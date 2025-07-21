import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
export const formatCurrency = (amount?: number | null) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₦0';
  }
  return `₦${amount.toLocaleString()}`;
};



export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number; 

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// utils/slugify.ts
export const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-');

// utils.ts

export const getImageSrc = (image: any): string => {
  if (image?.base64_product_image) {
    return `data:image/jpeg;base64,${image.base64_product_image}`;
  }
  return image?.image_url || "https://via.placeholder.com/400";
};
