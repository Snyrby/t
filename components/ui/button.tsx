"use client";

import { cn } from "@/lib/utils";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
  center?: boolean;
  start?: boolean;
};

export const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  className,
  center,
  start,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        `
        flex items-center rounded-full px-3 py-2 text-sm font-semibold
        focus-visible:outline-dotted
        focus-visible:outline-2
      focus-visible:outline-slate-500
        `,
        center && "justify-center",
        start && "justify-start",
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900 hover:bg-gray-300/30" : "text-white",
        danger && "bg-black hover:bg-black focus-visible:outline-black",
        !secondary &&
          !danger &&
          "target-red hover:bg-red-800 focus-visible:target-red",
        `${className}`
      )}
    >
      {children}
    </button>
  );
};
