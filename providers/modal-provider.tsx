"use client";
import { DropDownModal } from "@/components/modals/dropdown-modal";
import { LocationModal } from "@/components/modals/location-modal";
import { useEffect, useState } from "react";

export const ModalProviderGroup = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <LocationModal />
      <DropDownModal />
    </>
  );
};
