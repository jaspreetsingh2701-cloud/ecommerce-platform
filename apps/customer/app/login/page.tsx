"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(
    formData: FormData
  ) {
    sessionStorage.setItem(
      "cart-pending-merge",
      "true"
    );

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      sessionStorage.removeItem(
        "cart-pending-merge"
      );
      return;
    }

    router.push("/cart");
  }

  return (
    <main>
      <h1>Customer Login</h1>

      <form action={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}