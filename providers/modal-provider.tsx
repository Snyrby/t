"use client";
import { CategoryModal } from "@/components/modals/category-modal";
import { LocationModal } from "@/components/modals/location-modal";
import { MobileSideBarModal } from "@/components/modals/mobile-side-bar-modal";
import { ModalLayout } from "@/components/modals/modal-layout";
import { useEffect, useState } from "react";

export const ModalProviderGroup = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return null;
  }
  return <ModalLayout />;
};
