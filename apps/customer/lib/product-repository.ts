import type { Product } from "@repo/types";

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15",
    description: "Apple smartphone",
    price: 79999,
    image: "/products/iphone.jpg",
    category: "Phones",
    stock: 10,
  },
  {
    id: "2",
    name: "MacBook Air",
    description: "Apple laptop",
    price: 129999,
    image: "/products/macbook.jpg",
    category: "Laptops",
    stock: 5,
  },
];

export function findProduct(
  productId: string
): Product | null {
  return (
    products.find((product) => product.id === productId) ??
    null
  );
}