"use client";
import { LocationModal } from "@/components/modals/location-modal";
import { useEffect, useState } from "react";

export const ModalProviderGroup = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    });
    if (!isMounted) {
      return null;
    }
    return (
      <>
        <LocationModal />
      </>
    );
  };