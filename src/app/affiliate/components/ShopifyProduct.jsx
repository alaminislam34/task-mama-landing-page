"use client";

import { fetchProducts } from "@/lib/shopify";
import React, { useEffect, useState } from "react";

function ShopifyProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <h1>Shopify Products</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map(({ node }) => (
          <div
            key={node.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={node.images.edges[0]?.node.src}
              alt={node.title}
              width="180"
            />
            <h2>{node.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopifyProduct;
