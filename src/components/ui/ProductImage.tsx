import React, { useState, useEffect } from "react";
import { getOptimizedImageSrc } from "../../lib/utills/imageUtils";
import { Product } from "../../types";

interface ProductImageProps {
    product: Product;
    className?: string;
    alt?: string;
    loading?: "eager" | "lazy";
    onError?: () => void;
    onLoad?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
    product,
    className = "",
    alt,
    loading = "lazy",
    onError,
    onLoad,
}) => {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const loadImage = async () => {
            setImageLoading(true);
            setImageError(false);

            try {
                const optimizedSrc = await getOptimizedImageSrc(product);
                setImageSrc(optimizedSrc);
                setImageLoading(false);
            } catch (error) {
                console.error('Failed to load product image:', error);
                setImageError(true);
                setImageLoading(false);
                onError?.();
            }
        };

        loadImage();
    }, [product, onError]);

    const handleImageLoad = () => {
        setImageLoading(false);
        onLoad?.();
    };

    const handleImageError = () => {
        if (!imageError) {
            setImageError(true);
            // Try to load placeholder
            import("../../lib/utills/imageUtils").then(({ createPlaceholderBase64 }) => {
                setImageSrc(createPlaceholderBase64());
            });
            onError?.();
        }
    };

    if (imageLoading) {
        return (
            <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
                <div className="text-gray-400 text-sm">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <img
                src={imageSrc}
                alt={alt || product.name}
                className={`transition-opacity duration-300 ${className}`}
                loading={loading}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </div>

    );
};