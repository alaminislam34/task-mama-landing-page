"use client";

import { useEffect, useState } from "react";

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Shopify Products API call
    fetch("/api/shopifyProducts", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Checkout function
  const handleBuyNow = async (variantId) => {
    const mutation = `
      mutation {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${variantId}", quantity: 1 }]
        }) {
          checkout {
            id
            webUrl
          }
        }
      }`;

    try {
      const response = await fetch(
        "https://taskmama.myshopify.com/api/2025-07/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query: mutation }),
        }
      );

      const data = await response.json();

      if (data?.data?.checkoutCreate?.checkout?.webUrl) {
        window.location.href = data.data.checkoutCreate.checkout.webUrl;
      } else {
        console.error("Checkout creation failed", data);
      }
    } catch (err) {
      console.error("Error creating checkout:", err);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1440px] w-11/12 mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Our Exclusive Products
        </h1>
        <p className="text-gray-500 mt-2">
          Discover, explore, and shop the best from our collection
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {products.length === 0 && <p>No products available</p>}

        {products.map(({ node }) => {
          const imageUrl = node.images.edges[0]?.node.url;
          const variant = node.variants.edges[0]?.node;

          return (
            <div
              key={node.id}
              className="lg:min-w-[420px] lg:min-h-[302px] w-full max-w-[350px] rounded-2xl shadow-[0px_40px_40px_0px_#00000030] py-6 px-[42px] flex flex-col justify-center bg-white mx-auto duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={node.title}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="font-bold text-xl text-gray-800">{node.title}</h2>
              <p className="mt-1 text-gray-500 text-sm line-clamp-3">
                {node.description}
              </p>

              {variant && (
                <>
                  <p className="mt-4 font-semibold text-gray-900">
                    {variant.priceV2.amount} {variant.priceV2.currencyCode}
                  </p>
                  <button
                    onClick={() => handleBuyNow(variant.id)}
                    className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
