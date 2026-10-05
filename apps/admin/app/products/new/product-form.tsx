"use client";

import { useActionState } from "react";
import { createProduct } from "../../actions";
import { SubmitButton } from "./submit-button";

const initialState = {
  success: false,
  message: "",
};

export function ProductForm() {
  const [state, formAction] = useActionState(
    createProduct,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Product name</label>
        <input id="name" name="name" required />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          required
        />
      </div>

      <SubmitButton />

      {state.message && (
        <p aria-live="polite">{state.message}</p>
      )}
    </form>
  );
}