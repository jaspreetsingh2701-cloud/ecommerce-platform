// "use client";

// import { ReactNode } from "react";

// interface ButtonProps {
//   children: ReactNode;
//   className?: string;
//   appName: string;
// }

// export const Button = ({ children, className, appName }: ButtonProps) => {
//   return (
//     <button
//       className={className}
//       onClick={() => alert(`Hello from your ${appName} app!`)}
//     >
//       {children}
//     </button>
//   );
// };

import type { ButtonHTMLAttributes } from "react";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
  };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  let variantClass = "";

  if (variant === "primary") {
    variantClass =
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]";
  }

  if (variant === "secondary") {
    variantClass =
      "border border-[var(--color-border)] text-[var(--color-text)]";
  }

  if (variant === "danger") {
    variantClass =
      "bg-red-600 text-white hover:bg-red-700";
  }

  let sizeClass = "";

  if (size === "sm") {
    sizeClass = "px-3 py-1.5 text-sm";
  }

  if (size === "md") {
    sizeClass = "px-4 py-2 text-base";
  }

  if (size === "lg") {
    sizeClass = "px-6 py-3 text-lg";
  }

  return (
    <button
      className={`
    rounded-[var(--radius-md)]
    font-medium
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--color-primary)]
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${variantClass}
    ${sizeClass}
    ${className}
  `}
      {...props}
    />
  );
}