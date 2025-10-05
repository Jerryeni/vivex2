// components/OptimizedImage.tsx
import React, { useState, useEffect } from "react";
import { getOptimizedImageSrc, createPlaceholderBase64, ImageSource } from "../../lib/utills/imageUtils";

interface OptimizedImageProps {
  src: ImageSource;
  alt?: string;
  className?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
  placeholder?: string;
  width?: number;
  height?: number;
  forceConversion?: boolean;
  showLoadingSpinner?: boolean;
  loadingText?: string;
  onError?: (error?: any) => void;
  onLoad?: () => void;
  onClick?: () => void;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  loading = "lazy",
  placeholder = "No Image",
  width,
  height,
  forceConversion = false,
  showLoadingSpinner = true,
  loadingText = "Loading...",
  onError,
  onLoad,
  onClick,
  fallbackSrc,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    const loadImage = async () => {
      setImageLoading(true);
      setImageError(false);
      
      try {
        const optimizedSrc = await getOptimizedImageSrc(src, {
          forceConversion,
          placeholder,
          width,
          height,
        });
        setImageSrc(optimizedSrc);
        setImageLoading(false);
      } catch (error) {
        console.error('Failed to load image:', error);
        setImageError(true);
        setImageLoading(false);
        onError?.(error);
      }
    };

    loadImage();
  }, [src, forceConversion, placeholder, width, height, onError]);

  const handleImageLoad = () => {
    setImageLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    if (!imageError && retryCount < maxRetries) {
      // Retry loading
      setRetryCount(prev => prev + 1);
      return;
    }

    if (!imageError) {
      setImageError(true);
      
      // Try fallback source first
      if (fallbackSrc && retryCount === 0) {
        setImageSrc(fallbackSrc);
        setRetryCount(1);
        return;
      }
      
      // Load placeholder
      const placeholderSrc = createPlaceholderBase64(width || 10, height || 10, placeholder);
      setImageSrc(placeholderSrc);
      onError?.();
    }
  };

  // Loading state
  if (imageLoading && showLoadingSpinner) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${containerClassName}`}>
        <div className="text-gray-400 text-sm">{loadingText}</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${containerClassName}`} 
      onClick={onClick}
      style={{ width, height }} // Add width and height to the container
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`} // Changed to object-cover
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Optional overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 cursor-pointer" />
      )}
    </div>
  );
};