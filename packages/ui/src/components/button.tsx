import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  appName?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", appName, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "primary":
          return "bg-blue-600 text-white hover:bg-blue-700";
        case "secondary":
          return "bg-gray-200 text-gray-800 hover:bg-gray-300";
        case "outline":
          return "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50";
        default:
          return "bg-blue-600 text-white hover:bg-blue-700";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-3 py-1.5 text-sm";
        case "md":
          return "px-4 py-2 text-base";
        case "lg":
          return "px-6 py-3 text-lg";
        default:
          return "px-4 py-2 text-base";
      }
    };

    return (
      <button
        className={`font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses()} ${getSizeClasses()} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export * from "./button";
export * from "./card";
