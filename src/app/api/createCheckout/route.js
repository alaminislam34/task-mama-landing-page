// src/app/api/createCheckout/route.js
export async function POST(req) {
  try {
    const { variantId } = await req.json();

    const query = `
      mutation CreateCart($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      lines: [
        {
          merchandiseId: variantId, // ✅ variantId = ProductVariant GID (gid://shopify/ProductVariant/xxxxx)
          quantity: 1,
        },
      ],
    };

    const response = await fetch(
      "https://taskmama.myshopify.com/api/2025-07/graphql.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();
    console.log("Shopify cartCreate response:", result); // ✅ Debug log

    const cartCreate = result?.data?.cartCreate;

    if (!cartCreate) {
      return new Response(
        JSON.stringify({ error: "No cart data returned", raw: result }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (cartCreate.userErrors?.length > 0) {
      return new Response(
        JSON.stringify({ error: cartCreate.userErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(cartCreate.cart), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Cart API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
