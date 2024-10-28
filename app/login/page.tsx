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
  const { loginForm } = useContext(AuthContext);

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
      {loginForm && <AuthLegal />}
      
    </>
  );
}
