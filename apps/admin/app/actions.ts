// "use server";

// type ProductState = {
//   success: boolean;
//   message: string;
// };

// export async function createProduct(
//   previousState: ProductState,
//   formData: FormData
// ): Promise<ProductState> {
//   const name = formData.get("name")?.toString();
//   const price = formData.get("price")?.toString();

//   if (!name || !price) {
//     return {
//       success: false,
//       message: "Name and price are required",
//     };
//   }

//   if (Number(price) <= 0) {
//     return {
//       success: false,
//       message: "Price must be greater than 0",
//     };
//   }

//   // Later: save to database

//   return {
//     success: true,
//     message: `Product "${name}" created successfully`,
//   };
// }

"use server";

import { auth } from "@/auth";
import { productSchema } from "./validation";

type ProductState = {
  success: boolean;
  errors?: {
    name?: string[];
    price?: string[];
  };
  message?: string;
};

export async function createProduct(
  previousState: ProductState,
  formData: FormData
): Promise<ProductState> {

  // 1. Authentication
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  // 2. Authorization
  if (session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "You are not authorized",
    };
  }

  // 3. Validation
  const result = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, price } = result.data;

  // Later:
  // await db.product.create({
  //   data: { name, price }
  // });

  return {
    success: true,
    message: `Product "${name}" created successfully`,
  };
}