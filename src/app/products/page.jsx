// src/components/Product.jsx or app/Product/page.jsx
"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

// Import segregated components
import SkeletonGrid from "./components/SkeletonGrid";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CategoryTabs from "./components/CategoryTabs";

// The main Product component
export default function Product() {
  // State Management
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product data for the modal
  const [activeIndex, setActiveIndex] = useState(0); // Carousel image index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error handling state

  // -----------------------------
  // 1. Data Fetching (useEffect)
  // -----------------------------
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/shopifyProducts", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products from API.");
        return res.json();
      })
      .then((data) => {
        // Map original product data to include renamed categories for filtering
        const renamedData = data.map((item) => {
          let type = item.node.productType;
          if (type === "Paper products") type = "Planners & Journals";
          if (type === "Mug") type = "Mugs";
          if (type === "T-Shirt") type = "Tees";

          return {
            ...item,
            node: { ...item.node, productType: type },
          };
        });

        setProducts(renamedData);

        // Extract and set unique renamed categories
        const cats = new Set();
        renamedData.forEach(
          ({ node }) => node.productType && cats.add(node.productType),
        );

        // Define the required display order or simply set from the Set
        setCategories(["All", ...Array.from(cats)].filter((c) => c));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message || "Could not load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // 2. Filtered Products (useMemo)
  // Optimization: Only re-calculate when products or activeCategory changes
  // -----------------------------
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }
    return products.filter(({ node }) => node.productType === activeCategory);
  }, [products, activeCategory]);

  // -----------------------------
  // 3. Carousel Navigation Logic
  // -----------------------------
  const totalImages = selectedProduct?.images.edges.length || 0;

  useEffect(() => {
    // Reset carousel index when a new product is opened
    if (selectedProduct) setActiveIndex(0);
  }, [selectedProduct]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1,
    );
  }, [totalImages]);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1,
    );
  }, [totalImages]);

  const redirectToShopify = (productHandle) => {
    const url = `https://taskmama.myshopify.com/products/${productHandle}`;
    // Use rel="noopener noreferrer" for security when opening new tabs
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-[1440px] w-11/12 mx-auto py-10">
      {/* ---------------- Title & Subtitle ---------------- */}
      <div className="text-center mb-14 lg:mb-16">
        <h1 className="text-[30px] md:text-4xl lg:text-[56px] font-bold font-lato mb-5 md:mb-7 lg:mb-10 leading-normal text-gray-900 lg:max-w-5xl mx-auto">
          Grab your favorite tee, hoodie, or mug today and remind yourself
        </h1>
        <p className="text-base md:text-xl lg:text-[32px] font-medium leading-normal text-[#5C5C5C]">
          These pieces are small anchors for your day — a quiet reminder to slow
          down, breathe, and carry less.
        </p>
      </div>

      {/* ---------------- Category Tabs Component ---------------- */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* ---------------- Loader / Error / Products Grid ---------------- */}
      <div className="py-12">
        {loading && <SkeletonGrid />}

        {error && !loading && (
          <div className="text-center py-20 text-red-500 font-semibold text-lg border border-red-300 bg-red-50 rounded-lg p-6">
            <p>An error occurred: {error}</p>
            <p className="text-sm text-red-400 mt-2">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10 font-medium text-lg">
            No products found in the "{activeCategory}" category.
          </p>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(({ node }) => (
              <ProductCard
                key={node.id}
                product={node}
                onClick={() => setSelectedProduct(node)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Product Modal Component ---------------- */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          goToPrev={goToPrev}
          goToNext={goToNext}
          redirectToShopify={redirectToShopify}
        />
      )}
    </div>
  );
}
