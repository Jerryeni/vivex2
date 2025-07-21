import { useEffect, useState } from "react";
import { getOptimizedImageSrc } from "../utills/imageUtils";
import { Product } from "../../types";

// Hook for using product images
export const useProductImage = (product: Product) => {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadImage = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const optimizedSrc = await getOptimizedImageSrc(product);
          setImageSrc(optimizedSrc);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load image');
        } finally {
          setLoading(false);
        }
      };
  
      loadImage();
    }, [product]);
  
    return { imageSrc, loading, error };
  };