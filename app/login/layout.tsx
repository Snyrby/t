"use client";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthFormContextProvider } from "@/providers/auth-form-provider";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthFormContextProvider>
      <div className="flex flex-col justify-between items-center w-full h-full overflow-x-hidden">
        <div className="flex flex-col justify-start items-center w-screen max-w-[500px] px-4 sm:px-0 mt-8">
          {children}
        </div>
        <div className="w-full">
          <AuthFooter />
        </div>
      </div>
    </AuthFormContextProvider>
  );
}
