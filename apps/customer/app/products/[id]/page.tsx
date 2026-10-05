import type { Product } from "@repo/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "../add-to-cart";
import { CartCount } from "../../cart/cart-count";

// export const metadata: Metadata = {
//   title: "Products | My Store",
//   description: "Browse our latest smartphones and laptops.",
// };

// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   const { id } = await params;

//   const product = products.find((item) => item.id === id);

//   if (!product) {
//     return {
//       title: "Product Not Found | My Store",
//     };
//   }

//   return {
//     title: `${product.name} | My Store`,
//     description: product.description,
//   };
// }

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Product Not Found | My Store",
    };
  }

  return {
    title: `${product.name} | My Store`,
    description: product.description,

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.id}`,
    },

    openGraph: {
      title: `${product.name} | My Store`,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | My Store`,
      description: product.description,
      images: [product.image],
    },
  };
}

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 17",
    description: "Latest Apple smartphone",
    price: 79999,
    image: "/iphone.jpg",
    category: "Mobile",
    stock: 10,
  },
  {
    id: "2",
    name: "MacBook Air",
    description: "Lightweight Apple laptop",
    price: 129999,
    image: "/macbook.jpg",
    category: "Laptop",
    stock: 5,
  },
];

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  // if (!product) {
  //   return <h1>Product not found</h1>;
  // }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`https://mystore.com${product.image}`],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main>
      <CartCount />
        <article>
          <header>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </header>

          <section aria-labelledby="product-details">
            <h2 id="product-details">Product Details</h2>

            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Price: ₹{product.price}</p>
          </section>
          <AddToCart product={product} />
        </article>
      </main>
    </>
  );
}