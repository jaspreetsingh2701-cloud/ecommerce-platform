import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getCart } from "../../lib/cart-service";

// Render the authenticated user's cart.
export default async function CartPage() {
  // Read the current user's session on the server.
  const session = await auth();

  // Send unauthenticated users to the login page.
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Load the user's cart from Redis.
  const cart = await getCart(session.user.id);

  return (
    <main>
      {/* Display the page heading. */}
      <h1>Your Cart</h1>

      {/* Show an empty-cart message when there are no items. */}
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Render every item stored in the user's cart. */}
          {cart.items.map((item) => (
            <div key={item.product.id}>
              {/* Display the product name. */}
              <h2>{item.product.name}</h2>

              {/* Display the selected quantity. */}
              <p>Quantity: {item.quantity}</p>

              {/* Display the product price. */}
              <p>Price: ₹{item.product.price}</p>
            </div>
          ))}

          {/* Display the calculated cart total. */}
          <h2>Total: ₹{cart.total}</h2>
        </div>
      )}
    </main>
  );
}