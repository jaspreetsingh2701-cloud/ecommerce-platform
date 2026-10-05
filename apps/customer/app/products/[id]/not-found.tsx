import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Product not found</h1>

      <Link href="/products">
        Back to products
      </Link>
    </main>
  );
}