// import { type JSX } from "react";

// export function Card({
//   className,
//   title,
//   children,
//   href,
// }: {
//   className?: string;
//   title: string;
//   children: React.ReactNode;
//   href: string;
// }): JSX.Element {
//   return (
//     <a
//       className={className}
//       href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       <h2>
//         {title} <span>-&gt;</span>
//       </h2>
//       <p>{children}</p>
//     </a>
//   );
// }

import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 ${className}`}
      {...props}
    />
  );
}