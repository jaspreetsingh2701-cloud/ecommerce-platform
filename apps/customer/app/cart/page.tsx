import { signIn } from "../../auth";

export default function LoginPage() {
  return (
    <main>
      <h1>Customer Login</h1>

      <form
        action={async (formData) => {
          "use server";

          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/cart",
          });
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}