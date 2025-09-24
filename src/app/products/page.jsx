"use client";

import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal
  const [activeIndex, setActiveIndex] = useState(0); // State for carousel image index

  // 1. Fetch Products and Categories
  useEffect(() => {
    fetch("/api/shopifyProducts", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Extract unique categories
        const cats = new Set();
        data.forEach(
          ({ node }) => node.productType && cats.add(node.productType)
        );
        setCategories(["All", ...Array.from(cats)]);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 2. Reset activeIndex when a new product is selected
  useEffect(() => {
    if (selectedProduct) {
      setActiveIndex(0);
    }
  }, [selectedProduct]);

  // 3. Carousel Navigation Handlers (using useCallback for optimization)
  const totalImages = selectedProduct?.images.edges.length || 0;

  const goToPrev = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  }, [totalImages]);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  }, [totalImages]);

  // 4. Checkout Handler
  const handleBuyNow = async (variantId) => {
    if (!variantId) return alert("Invalid product selection.");

    try {
      const res = await fetch("/api/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("HTTP error during checkout:", res.status, errorText);
        return alert("Failed to create checkout. Please try again.");
      }

      const data = await res.json();

      if (data?.checkoutUrl) window.location.href = data.checkoutUrl;
      else if (data?.error) {
        console.error("Checkout creation failed:", data.error);
        alert("Something went wrong during checkout.");
      } else {
        console.error("Unexpected response:", data);
        alert("Unexpected error during checkout.");
      }
    } catch (err) {
      console.error("Error creating checkout:", err);
      alert("Server error during checkout.");
    }
  };

  // 5. Product Filtering
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(({ node }) => node.productType === activeCategory);

  return (
    <div className="max-w-[1440px] w-11/12 mx-auto py-10">
      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal text-gray-900">
          Our Exclusive Collection 🛍️
        </h1>
        <p className="text-base md:text-xl lg:text-[32px] font-medium leading-normal text-[#5C5C5C]">
          Discover, explore, and shop from our curated selection of fine
          products.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 justify-start lg:justify-center mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 lg:flex-0 min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] px-3 py-2 rounded-full font-semibold transition duration-200 border-2 text-center cursor-pointer ${
              activeCategory === cat
                ? `bg-primary text-white border-transparent shadow-lg shadow-purple-200`
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
        {filteredProducts.length === 0 && (
          <p className="text-center col-span-full text-gray-500 py-10">
            No products found in this category.
          </p>
        )}

        {filteredProducts.map(({ node }) => {
          const imageUrl = node.images.edges[0]?.node.url;
          const variant = node.variants.edges[0]?.node;
          const available = node.availableForSale;

          return (
            <div
              key={node.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
              onClick={() => setSelectedProduct(node)}
            >
              {/* Product Image */}
              {imageUrl && (
                <div className="h-56 w-full overflow-hidden relative rounded-t-2xl">
                  <img
                    src={imageUrl}
                    alt={node.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* Availability Badge */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                      available
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {available ? "In Stock" : "Sold Out"}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                {/* Category Tag */}
                <p
                  className={`text-xs font-semibold uppercase mb-1 text-primary`}
                >
                  {node.productType || "General"}
                </p>

                {/* Title and Description */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {node.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                  {node.description}
                </p>
              </div>

              {/* Price & Buy Now Section */}
              <div className="px-5 pb-5 pt-0">
                {variant && (
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold text-gray-900">
                      ${variant.priceV2.amount}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(variant.id);
                      }}
                      className={`py-2 px-6 text-sm font-semibold rounded-lg transition duration-200  ${
                        available
                          ? `bg-primary text-white hover:bg-[#9785c4] cursor-pointer`
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      disabled={!available}
                    >
                      {available ? "Buy Now" : "Unavailable"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* Modal - Fully Responsive and Interactive Carousel (Modified with Primary Color) */}
      {/* ------------------------------------------------------------------------- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-start md:items-center z-50 overflow-y-auto p-4 transition-opacity duration-300 ease-out">
          {/* Modal Content Container */}
          <div className="bg-white p-8 shadow-2xl rounded-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute cursor-pointer top-2 right-2 text-3xl text-gray-400 hover:text-gray-900 transition-colors duration-200 p-1 rounded-full bg-white/50 hover:bg-white z-10"
              aria-label="Close"
            >
              <X />
            </button>

            <div className="bg-white max-h-[80vh] overflow-y-auto  w-full max-w-7xl mx-auto my-8 md:my-0 p-6 relative transform transition-transform duration-300 ease-out scale-100">
              {/* Main Content: Two-column layout on medium screens and up */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* 1. Images Section (Carousel/Gallery) */}
                <div className="md:w-1/2 flex flex-col gap-4">
                  {/* Main Image Container with Arrows */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-gray-200 shadow-md">
                    {/* Main Image Display */}
                    {selectedProduct.images.edges.length > 0 && (
                      <img
                        src={
                          selectedProduct.images.edges[activeIndex]?.node.url
                        }
                        alt={
                          selectedProduct.images.edges[activeIndex]?.node
                            .altText || selectedProduct.title
                        }
                        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                      />
                    )}

                    {/* Navigation Arrows */}
                    {totalImages > 1 && (
                      <>
                        {/* Left Arrow */}
                        <button
                          onClick={goToPrev}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg transition"
                          aria-label="Previous image"
                        >
                          <svg
                            className="w-6 h-6 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            ></path>
                          </svg>
                        </button>
                        {/* Right Arrow */}
                        <button
                          onClick={goToNext}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg transition"
                          aria-label="Next image"
                        >
                          <svg
                            className="w-6 h-6 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails (Interactive Row) */}
                  <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                    {selectedProduct.images.edges.map(({ node }, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg cursor-pointer border-2 transition-colors 
                      ${
                        idx === activeIndex
                          ? `border-primary shadow-md`
                          : "border-gray-300 hover:border-gray-400"
                      }`} // Use primary color border
                        aria-current={idx === activeIndex ? "true" : "false"}
                      >
                        <img
                          src={node.url}
                          alt={node.altText || selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Product Details Section */}
                <div className="md:w-1/2 flex flex-col gap-4">
                  <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                    {selectedProduct.title}
                  </h2>

                  {/* Price */}
                  <p
                    className={`text-3xl font-bold text-primary border-b pb-4`}
                  >
                    {" "}
                    {/* Use primary color for price */}$
                    {selectedProduct.variants.edges[0]?.node.priceV2.amount}
                  </p>

                  {/* Description */}
                  <div className="text-gray-700 text-base leading-relaxed border-b pb-4">
                    <p>{selectedProduct.description}</p>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Category:
                      </span>{" "}
                      {selectedProduct.productType || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Vendor:
                      </span>{" "}
                      {selectedProduct.vendor || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Availability:
                      </span>{" "}
                      <span
                        className={
                          selectedProduct.availableForSale
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {selectedProduct.availableForSale
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </p>
                  </div>

                  {/* Tags */}
                  {selectedProduct.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t mt-2">
                      <span className="font-semibold text-gray-800 w-full mb-1">
                        Tags:
                      </span>{" "}
                      {selectedProduct.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buy Now Button */}
                  <button
                    onClick={() =>
                      handleBuyNow(selectedProduct.variants.edges[0]?.node.id)
                    }
                    className={`w-full mt-4 py-3 text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer ${
                      selectedProduct.availableForSale
                        ? `bg-primary hover:bg-[#9785c4]`
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`} // Use primary color
                    disabled={!selectedProduct.availableForSale}
                  >
                    {selectedProduct.availableForSale
                      ? "Buy Now"
                      : "Currently Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
