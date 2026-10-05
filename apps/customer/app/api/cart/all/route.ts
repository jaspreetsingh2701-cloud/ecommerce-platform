import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { clearCart } from "../../../../lib/cart-service";

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  clearCart(session.user.id);

  return NextResponse.json({
    success: true,
    message: "Cart cleared",
  });
}