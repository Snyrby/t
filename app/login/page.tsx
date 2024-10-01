"use client";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLegal } from "@/components/auth/auth-legal";
import { useModal } from "@/hooks/use-modal-store";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const { isOpen, onClose } = useModal();
  const searchParams = useSearchParams();
  const action = searchParams.get("actions");

  useEffect(() => {
    isOpen && onClose();
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <div className="flex flex-col justify-start items-center w-[500px] mt-8">
        <AuthHeader action={action} />
        <AuthForm />
        <AuthLegal />
        <AuthFooter />
      </div>
    </div>
  );
}
