import type { Product } from "@repo/types";
import { CartCount } from "./../cart/cart-count";
import styles from "./product.module.css";
import { getProducts } from "../../lib/product-repository";

// async function getProducts(): Promise<Product[]> {
//   const response = await fetch("http://localhost:3000/api/products", {
//     cache: "force-cache"
//   });

//   // throw new Error("Test error");

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return response.json();
// }


export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className={styles.title}>Products</h1>
      <h1 className="text-3xl font-bold">Tailwind is working</h1>

      <CartCount />

      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      ))}
    </main>
  );
}