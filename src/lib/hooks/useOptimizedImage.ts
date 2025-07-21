import { useEffect, useState } from "react";
import { createPlaceholderBase64, getOptimizedImageSrc, ImageSource } from "../utills/imageUtils";

// Hook for using optimized images
export const useOptimizedImage = (
    src: ImageSource,
    options?: {
      forceConversion?: boolean;
      placeholder?: string;
      width?: number;
      height?: number;
    }
  ) => {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadImage = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const optimizedSrc = await getOptimizedImageSrc(src, options);
          setImageSrc(optimizedSrc);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load image');
          setImageSrc(createPlaceholderBase64(
            options?.width || 200, 
            options?.height || 200, 
            options?.placeholder || "Error"
          ));
        } finally {
          setLoading(false);
        }
      };
  
      loadImage();
    }, [src, options?.forceConversion, options?.placeholder, options?.width, options?.height]);
  
    return { imageSrc, loading, error };
  };
  