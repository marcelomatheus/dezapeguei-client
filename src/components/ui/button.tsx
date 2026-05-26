import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-orange-600 text-white hover:bg-orange-700",
  secondary: "bg-orange-100 text-orange-900 hover:bg-orange-200",
  ghost: "bg-transparent text-orange-700 hover:bg-orange-50",
};

export function Button({
  variant = "primary",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
