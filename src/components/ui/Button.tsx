"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className = "", variant = "primary", size = "md", disabled, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-full font-semibold transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ";

        const sizeStyles = {
            sm: "px-4 py-1.5 text-xs",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base",
        }[size];

        const variantStyles =
            variant === "secondary"
                ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900 disabled:bg-gray-800"
                : "bg-gradient-to-b from-[#09CAC8] to-[#005099] text-white hover:opacity-90 focus:ring-[#09CAC8] focus:ring-offset-gray-900 disabled:opacity-50";

        const disabledStyles = disabled ? " cursor-not-allowed" : " cursor-pointer";

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${sizeStyles} ${variantStyles} ${disabledStyles} ${className}`.trim()}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
