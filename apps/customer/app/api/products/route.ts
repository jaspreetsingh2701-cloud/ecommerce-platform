import type { Product } from "@repo/types";
import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(products);
}