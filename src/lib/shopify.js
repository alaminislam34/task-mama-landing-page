// lib/shopify.js
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://ijhxg4-sr.myshopify.com/admin/api/2025-07/graphql.json",
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  }
);

export const fetchProducts = async () => {
  const query = `
    query {
      products(first: 5) {
        edges {
          node {
            id
            title
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await client.request(query);
  return data.products.edges;
};
