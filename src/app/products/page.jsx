"use client";

import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal product
  const [activeIndex, setActiveIndex] = useState(0); // Carousel index
  const [loading, setLoading] = useState(true); // Loader state

  // -----------------------------
  // 1. Fetch Products & Categories
  // -----------------------------
  useEffect(() => {
    setLoading(true);
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
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // 2. Reset carousel index when new product is selected
  // -----------------------------
  useEffect(() => {
    if (selectedProduct) setActiveIndex(0);
  }, [selectedProduct]);

  const totalImages = selectedProduct?.images.edges.length || 0;

  // -----------------------------
  // 3. Carousel Navigation
  // -----------------------------
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

  // -----------------------------
  // 4. Filter products based on category
  // -----------------------------
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(({ node }) => node.productType === activeCategory);

  // -----------------------------
  // 5. Redirect to Shopify
  // -----------------------------
  const redirectToShopify = (productHandle) => {
    const url = `https://taskmama.myshopify.com/products/${productHandle}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-[1440px] w-11/12 mx-auto py-10">
      {/* ---------------- Title & Subtitle ---------------- */}
      <div className="text-center mb-14 lg:mb-16 ">
        <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal text-gray-900 lg:max-w-5xl mx-auto">
          Grab your favorite tee, hoodie, or mug today and remind yourself
        </h1>
        <p className="text-base md:text-xl lg:text-[32px] font-medium leading-normal text-[#5C5C5C]">
          Show off your TaskMama pride! You're balancing smarter - not harder.{" "}
          <br />
          Shop now and wear your power!
        </p>
      </div>

      {/* ---------------- Category Tabs ---------------- */}
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

      {/* ---------------- Loader ---------------- */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ---------------- Products Grid ---------------- */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
          {filteredProducts.length === 0 && (
            <p className="text-center col-span-full text-gray-500 py-10">
              No products found in this category.
            </p>
          )}

          {filteredProducts.map(({ node }) => {
            const imageUrl = node.images.edges[0]?.node.url;
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
                  {/* Category */}
                  <p className="text-xs font-semibold uppercase mb-1 text-primary">
                    {node.productType || "General"}
                  </p>

                  {/* Title & Description */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {node.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                    {node.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- Modal ---------------- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-start md:items-center z-50 overflow-y-auto p-4">
          <div className="bg-white p-8 shadow-2xl rounded-xl relative max-w-7xl w-full mx-auto my-8 md:my-0">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-3xl text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full bg-white/50 hover:bg-white z-10 cursor-pointer"
              aria-label="Close"
            >
              <X />
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Images */}
              <div className="md:w-1/2 flex flex-col gap-4 relative">
                {/* Main Image */}
                <div className="relative h-80 sm:h-[400px] md:h-[420px] lg:h-[450px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-md">
                  {selectedProduct.images.edges.length > 0 && (
                    <img
                      src={selectedProduct.images.edges[activeIndex]?.node.url}
                      alt={
                        selectedProduct.images.edges[activeIndex]?.node
                          .altText || selectedProduct.title
                      }
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                    />
                  )}

                  {/* Left Arrow */}
                  {totalImages > 1 && (
                    <button
                      onClick={goToPrev}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-black cursor-pointer rounded-full flex items-center justify-center w-10 h-10 shadow-md z-10"
                      aria-label="Previous Image"
                    >
                      <ArrowLeft/>
                    </button>
                  )}

                  {/* Right Arrow */}
                  {totalImages > 1 && (
                    <button
                      onClick={goToNext}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-black cursor-pointer rounded-full flex items-center justify-center w-10 h-10 shadow-md z-10"
                      aria-label="Next Image"
                    >
                     <ArrowRight/>
                    </button>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                  {selectedProduct.images.edges.map(({ node }, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg cursor-pointer border-2 transition-colors ${
                        idx === activeIndex
                          ? `border-primary shadow-md`
                          : "border-gray-300 hover:border-gray-400"
                      }`}
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

              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                  {selectedProduct.title}
                </h2>
                <p className="text-3xl font-bold text-primary border-b pb-4">
                  ${selectedProduct.variants.edges[0]?.node.priceV2.amount}
                </p>
                <div className="text-gray-700 text-base leading-relaxed border-b pb-4">
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Category:
                    </span>{" "}
                    {selectedProduct.productType || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-800">Vendor:</span>{" "}
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

                {selectedProduct.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t mt-2">
                    <span className="font-semibold text-gray-800 w-full mb-1">
                      Tags:
                    </span>
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

                {/* ---------------- Buy Now Button ---------------- */}
                <button
                  onClick={() => redirectToShopify(selectedProduct.handle)}
                  className="mt-4 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors text-center cursor-pointer"
                >
                  Buy Now on Shopify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
