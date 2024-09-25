"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  watch?: string;
  children?: React.ReactNode;
  maxLength?: number;
}

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  watch,
  children,
  maxLength,
}: InputProps) => {
  const [focus, setFocus] = useState<string | null>(null);
  return (
    <div className="relative w-full h-11 group mt-3">
      <label
        className={cn(
          "absolute left-2 z-0 bg-white font-medium leading-6 text-gray-900 transition-all cursor-text",
          (watch !== "" || focus === id) && "-translate-y-[8px] px-1 text-xs",
          watch === "" &&
            focus === null &&
            "top-2.5 text-sm underline underline-offset-4 decoration-gray-300"
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete="off"
        disabled={disabled}
        onClick={() => setFocus(id)}
        {...register(id, {
          required,
          onBlur: () => setFocus(null),
          ...(maxLength && {
            maxLength: {
              value: maxLength,
              message: "Keep Below " + maxLength,
            },
          }),
        })}
        className={cn(
          `
            h-11
            block
            w-full
            border-none
            py-1.5
            px-2
            text-gray-900
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:outline-none
            focus:ring-inset
            focus:ring-gray-300
            sm:text-sm
            sm:leading-6
          `,
          errors[id] && "focus: ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
      {children}
    </div>
  );
};

export default Input;
