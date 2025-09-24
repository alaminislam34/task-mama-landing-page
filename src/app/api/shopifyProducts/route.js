// src/app/api/shopifyProducts/route.js
export async function POST(req) {
  const query = `
  {
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        descriptionHtml
        productType
        vendor
        availableForSale
        tags
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
        createdAt
        updatedAt
      }
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
        body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();

    return new Response(JSON.stringify(result.data.products.edges), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
