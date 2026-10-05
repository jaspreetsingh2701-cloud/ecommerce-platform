import { NextResponse } from "next/server";
import {
  getCart,
  addItem,
  updateItem,
  removeItem
} from "../../../lib/cart-service";
import { addToCartSchema, updateCartSchema, removeCartSchema } from "../../../lib/cart-validation";
import {auth} from "./../../../auth";

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const cart = getCart(session.user.id);

  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const result = addToCartSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid cart request",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { productId, quantity } = result.data;

  try {
    const cart = addItem(
      session.user.id,
      productId,
      quantity
    );

    return NextResponse.json(cart);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to add item to cart";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const result = updateCartSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid cart request",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { productId, quantity } = result.data;

  try {
    const cart = updateItem(
      session.user.id,
      productId,
      quantity
    );

    return NextResponse.json(cart);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to update cart";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const result = removeCartSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid cart request",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const cart = removeItem(
      session.user.id,
      result.data.productId
    );

    return NextResponse.json(cart);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to remove item";

    return NextResponse.json(
      { message },
      { status: 400 }
    );
  }
}