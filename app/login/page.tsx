"use client";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLegal } from "@/components/auth/auth-legal";
import { useModal } from "@/hooks/use-modal-store";
import { AuthContext } from "@/providers/auth-form-provider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function LoginPage() {
  const { isOpen, onClose } = useModal();
  const { registerForm } = useContext(AuthContext);

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
    <>
      <AuthHeader />
      <AuthForm />
      {!registerForm && <AuthLegal />}
      <Link className="text-xs tracking-tighter md:whitespace-nowrap text-center mt-14" href="/"><span className="font-bold">*See offer details.</span> Restrictions apply. Pricing, promotions and availability may vary by location and at Target.com</Link>
      <AuthFooter />
    </>
  );
}
