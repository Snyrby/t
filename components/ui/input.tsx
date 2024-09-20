"use client";

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div className="relative w-full h-11 group">
      <label
        className="absolute top-1.5 left-2 group-focus-within:-translate-y-[13px] 
        group-focus-within:px-1 z-10 group-focus-within:text-xs bg-white transition-all 
        text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete="off"
        disabled={disabled}
        {...register(id, { required })}
        className={cn(
          `
                form-input
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
    </div>
  );
};

export default Input;
