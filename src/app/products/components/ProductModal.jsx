'use client'

// src/components/ProductModal.jsx
import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const ProductModal = ({
    product,
    onClose,
    activeIndex,
    setActiveIndex,
    goToPrev,
    goToNext,
    redirectToShopify,
}) => {
    
    const totalImages = product?.images.edges.length || 0;

    // Accessibility: Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Prevent scrolling when modal is open (better UX)
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const price = product.variants.edges[0]?.node.priceV2.amount;

    return (
        // FIXED: Changed the fixed height/centering of the backdrop container 
        // to a minimum height of screen (min-h-screen) and added overflow-y-auto 
        // to ensure the content is always accessible by scrolling within the backdrop.
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4 md:p-8 min-h-screen" 
            onClick={onClose} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-title"
        >
            {/* Modal Content Container - Added classes for max height and scroll behavior */}
            <div 
                className="bg-white p-6 md:p-10 shadow-3xl rounded-xl relative max-w-7xl w-full mx-auto my-4 md:my-0 transform transition-all duration-300 scale-100 overflow-y-auto max-h-[95vh]" 
                onClick={e => e.stopPropagation()}
            >
                
                {/* Close Button (z-20 is good to keep it clickable) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full bg-white/70 hover:bg-white z-20 shadow-lg border border-gray-100"
                    aria-label="Close product view"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    
                    {/* Images & Carousel */}
                    <div className="lg:w-1/2 flex flex-col gap-4 relative">
                        {/* Main Image: aspect-square ensures it takes up available width but keeps proportion */}
                        <div className="relative aspect-square sm:h-[450px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-xl">
                            {totalImages > 0 && (
                                <img
                                    src={product.images.edges[activeIndex]?.node.url}
                                    alt={product.images.edges[activeIndex]?.node.altText || product.title}
                                    className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                                />
                            )}
                            
                            {/* Carousel Navigation Buttons (unchanged) */}
                            {totalImages > 1 && (
                                <>
                                    <button
                                        onClick={goToPrev}
                                        className="absolute top-1/2 cursor-pointer left-3 transform -translate-y-1/2 bg-white/70 text-gray-700 hover:bg-white hover:text-black transition-colors rounded-full flex items-center justify-center w-10 h-10 shadow-lg z-10"
                                        aria-label="Previous Image"
                                    >
                                        <ArrowLeft className="w-5 h-5"/>
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute top-1/2 cursor-pointer right-3 transform -translate-y-1/2 bg-white/70 text-gray-700 hover:bg-white hover:text-black transition-colors rounded-full flex items-center justify-center w-10 h-10 shadow-lg z-10"
                                        aria-label="Next Image"
                                    >
                                        <ArrowRight className="w-5 h-5"/>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails (unchanged, overflow-x-auto handles many images) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 justify-start py-2">
                            {product.images.edges.map(({ node }, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg cursor-pointer border-3 transition-all duration-300 ${
                                        idx === activeIndex
                                            ? `border-primary shadow-lg ring-4 ring-primary/50`
                                            : "border-gray-200 hover:border-gray-400"
                                    }`}
                                    aria-current={idx === activeIndex ? "true" : "false"}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(idx)}
                                >
                                    <img
                                        src={node.url}
                                        alt={`Thumbnail ${idx + 1} of ${product.title}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 flex flex-col gap-5">
                        <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
                            {product.title}
                        </h2>
                        
                        {/* Price */}
                        <p className="text-3xl sm:text-4xl font-bold text-primary pb-3 border-b-2 border-gray-100">
                            ${price}
                        </p>
                        
                        {/* Description - Removed max-height on small screens, only apply on large (lg) */}
                        <div className="text-gray-700 text-base leading-relaxed lg:max-h-48 lg:overflow-y-auto pr-2">
                            <p>{product.description}</p>
                        </div>

                        {/* Metadata Grid (unchanged) */}
                        <div className="grid grid-cols-2 gap-y-3 text-base border-t pt-4">
                            <p className="col-span-2 sm:col-span-1 text-gray-600">
                                <span className="font-bold text-gray-800">Category:</span>{" "}
                                {product.productType || "N/A"}
                            </p>
                            <p className="col-span-2 sm:col-span-1 text-gray-600">
                                <span className="font-bold text-gray-800">Vendor:</span>{" "}
                                {product.vendor || "N/A"}
                            </p>
                            <p className="col-span-2 text-gray-600">
                                <span className="font-bold text-gray-800">Availability:</span>{" "}
                                <span
                                    className={
                                        product.availableForSale
                                            ? "text-green-600 font-extrabold"
                                            : "text-red-600 font-extrabold"
                                    }
                                >
                                    {product.availableForSale ? "In Stock" : "Out of Stock"}
                                </span>
                            </p>
                        </div>

                        {/* Tags (unchanged) */}
                        {product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t">
                                <span className="font-bold text-gray-800 w-full mb-1">Tags:</span>
                                {product.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Buy Now Button (unchanged) */}
                        <button
                            onClick={() => redirectToShopify(product.handle)}
                            className="mt-6 w-full bg-primary text-white font-extrabold text-sm py-4 px-6 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-purple-300/50 uppercase tracking-wider disabled:bg-gray-400 disabled:shadow-none cursor-pointer"
                            disabled={!product.availableForSale}
                        >
                            {product.availableForSale ? "Buy Now on Shopify" : "Notify Me When Available"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;