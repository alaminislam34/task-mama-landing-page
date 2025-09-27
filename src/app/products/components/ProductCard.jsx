'use client'

// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onClick }) => {
  const imageUrl = product.images.edges[0]?.node.url;
  const available = product.availableForSale;
  const price = product.variants.edges[0]?.node.priceV2.amount;

  return (
    <div
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col group"
      onClick={onClick}
      aria-label={`View details for ${product.title}`}
      role="button"
    >
      {/* Product Image */}
      {imageUrl && (
        <div className="h-56 w-full overflow-hidden relative rounded-t-2xl">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-md transition-colors ${
              available ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {available ? "In Stock" : "Sold Out"}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Price */}
        <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold uppercase text-primary">
                {product.productType || "General"}
            </p>
            <p className="text-lg font-bold text-gray-900">${price}</p>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          {product.description}
        </p>
        
        {/* Quick View CTA (Visual cue) */}
        <button
          className="mt-auto text-primary border border-primary cursor-pointer text-sm font-semibold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
            Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;