import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={[
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
