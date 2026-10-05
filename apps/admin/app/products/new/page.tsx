import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { ProductForm } from "./product-form";

export default async function NewProductPage() {
  const session: any = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <main>
      <h1>Add Product</h1>
      <ProductForm />
    </main>
  );
}