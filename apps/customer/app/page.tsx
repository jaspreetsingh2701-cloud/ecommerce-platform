import { Button } from "@repo/ui/button";
import type { Product } from "@repo/types";

const product: Product = {
  id: "1",
  name: "iPhone 17",
  description: "Latest iPhone",
  price: 79999,
  image: "/iphone.jpg",
  category: "Mobile",
  stock: 10,
};

export default function CustomerPage() {
  return (
    <main>
      <h1>Customer portal</h1>
      <p>Welcome to our e-commerce platform</p>

      <p>{product.name}</p>
      <p>₹{product.price}</p>

      <Button appName="Customer">Manage Products</Button>
    </main>
  );
}
