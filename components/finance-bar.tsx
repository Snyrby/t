"use client";
import { FinanceBarLinks } from "@/constants";
import { useRouter } from "next/navigation";

export const FinanceBar = () => {
  const router = useRouter();
  return (
    <div className="h-[50px] target-red w-full">
      <div className="flex justify-between items-center mx-auto my-0 h-full max-w-[1400px]">
        <div className="h-full flex items-center justify-start gap-x-4">
          <div className="hover:cursor-pointer">Location</div>
          <div className="hover:cursor-pointer">Store</div>
        </div>
        <div className="flex justify-end items-center text-sm text-white gap-x-5">
          {FinanceBarLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              className="hover:underline hover:cursor-pointer"
              onClick={() => router.push("/test")}
            >
              {link.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
