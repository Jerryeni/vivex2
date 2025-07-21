import { Product } from "../../types";

/**
 * Utility function to convert image URL to base64
 */
export const convertToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

/**
 * Create a placeholder base64 image (SVG)
 */
export const createPlaceholderBase64 = (width: number = 200, height: number = 200, text: string = "No Image"): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9fa6b2" text-anchor="middle" dominant-baseline="central">${text}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Image source configuration type
 */
export type ImageSource = 
  | string // Direct URL or base64 string
  | Product// Product object
  | { 
      src?: string; 
      base64?: string; 
      url?: string; 
      image_url?: string;
      base64_product_image?: string;
      [key: string]: any;
    }; // Generic object with image properties

/**
 * Extract image source from various input types
 */
export const extractImageSrc = (source: ImageSource): string => {
  // Handle string input (URL or base64)
  if (typeof source === 'string') {
    return source;
  }

  // Handle Product object
  if (source && typeof source === 'object' && 'images' in source) {
    const product = source as Product;
    if (product.images && product.images.length > 0) {
      // Check if the image has base64_product_image field
      if (product.images[0].base64_product_image) {
        if (product.images[0].base64_product_image.startsWith('data:')) {
          return product.images[0].base64_product_image;
        }
        return `data:image/jpeg;base64,${product.images[0].base64_product_image}`;
      }
      // Fallback to image_url if base64 is not available
      if (product.images[0].image_url) {
        return product.images[0].image_url;
      }
    }
  }

  // Handle generic object with image properties
  if (source && typeof source === 'object') {
    const obj = source as any;
    
    // Try different common image property names
    if (obj.base64_product_image) {
      if (obj.base64_product_image.startsWith('data:')) {
        return obj.base64_product_image;
      }
      return `data:image/jpeg;base64,${obj.base64_product_image}`;
    }
    
    if (obj.base64) {
      if (obj.base64.startsWith('data:')) {
        return obj.base64;
      }
      return `data:image/jpeg;base64,${obj.base64}`;
    }
    
    if (obj.src) return obj.src;
    if (obj.url) return obj.url;
    if (obj.image_url) return obj.image_url;
    if (obj.imageUrl) return obj.imageUrl;
    if (obj.thumbnail) return obj.thumbnail;
    if (obj.featured_image) return obj.featured_image;
  }

  return "/placeholder.jpg";
};

/**
 * Get optimized image source with error handling
 */
export const getOptimizedImageSrc = async (
  source: ImageSource,
  options?: {
    forceConversion?: boolean;
    placeholder?: string;
    width?: number;
    height?: number;
  }
): Promise<string> => {
  try {
    const imageUrl = extractImageSrc(source);
    
    // Check if it's already a base64 string
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Check if it's a placeholder
    if (imageUrl.includes('placeholder')) {
      return createPlaceholderBase64(
        options?.width || 200, 
        options?.height || 200, 
        options?.placeholder || "No Image"
      );
    }
    
    // Convert external URLs to base64 if requested or if it fails to load normally
    if (options?.forceConversion) {
      try {
        const base64 = await convertToBase64(imageUrl);
        return base64;
      } catch (conversionError) {
        console.warn('Failed to convert image to base64, using original URL:', conversionError);
        return imageUrl;
      }
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Failed to load image:', error);
    return createPlaceholderBase64(
      options?.width || 200, 
      options?.height || 200, 
      options?.placeholder || "Error Loading"
    );
  }
};




// Specialized components for different use cases
// export const ProductImage: React.FC<Omit<OptimizedImageProps, 'src'> & { product: any }> = ({
//   product,
//   ...props
// }) => <OptimizedImage src={product} {...props} />;

// export const BlogImage: React.FC<OptimizedImageProps> = (props) => (
//   <OptimizedImage placeholder="Blog Image" {...props} />
// );

// export const AvatarImage: React.FC<OptimizedImageProps> = (props) => (
//   <OptimizedImage 
//     placeholder="Avatar" 
//     className={`rounded-full ${props.className || ''}`}
//     {...props} 
//   />
// );

// export const ThumbnailImage: React.FC<OptimizedImageProps> = (props) => (
//   <OptimizedImage 
//     placeholder="Thumbnail" 
//     loading="lazy"
//     {...props} 
//   />
// );