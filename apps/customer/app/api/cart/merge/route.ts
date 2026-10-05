import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { mergeCart } from "../../../../lib/cart-service";
import { mergeCartSchema } from "../../../../lib/cart-validation";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const result = mergeCartSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid cart",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    let cart: any = {
      items: [],
      total: 0,
    };

    for (const item of result.data.items) {
      cart = mergeCart(
        session.user.id,
        result.data.items
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to merge cart";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}