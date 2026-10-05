import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
// import type { Product } from "@repo/types";
import { ThemeToggle } from "./theme-toggle";

export default function CustomerPage() {
  return (
    <main
      className="min-h-screen bg-[var(--color-background)] p-8 text-[var(--color-text)]"
    >
      <ThemeToggle />
      <h1 className="text-3xl font-bold">
        Ecommerce Platform
      </h1>

      <p className="mt-4 text-[var(--color-text-muted)]">
        Dark theme using design tokens
      </p>

      <button className="mt-6 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-white">
        Shop Now
      </button>

      <Button>
        Buy Now
      </Button>

      <Button variant="secondary">
        Cancel
      </Button>

      <Button variant="danger" size="sm">
        Delete
      </Button>

      <div className="mt-8 mb-8 bg-red-600 p-4 text-white">
        RED TEST
      </div>

      <Card className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold">
          Product Card
        </h2>

        <p className="mt-2 text-sm md:text-base text-[var(--color-text-muted)]">
          Responsive shared component
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>Product 1</Card>
        <Card>Product 2</Card>
        <Card>Product 3</Card>
        <Card>Product 4</Card>
      </div>
    </main>
  );
}
