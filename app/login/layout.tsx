"use client";
import { AuthFormContextProvider } from "@/providers/auth-form-provider";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthFormContextProvider>
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div className="flex flex-col justify-start items-center w-[500px] mt-8">
          {children}
        </div>
      </div>
    </AuthFormContextProvider>
  );
}
