import { useModal } from "@/hooks/use-modal-store";
import { X } from "lucide-react";
import React from "react";

const LocationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  if (type !== "LOCATION" && isOpen === false) {
    return null;
  }
  return (
    <aside className="h-screen">
      <div className="h-full target-red">
        <div className="flex pt-3 pl-3">
          <p className="">Update shipping location</p>
          <div className="bg-gray-400 opacity-50 rounded-full w-7 h-7 transition hover:opacity-100">
            <X onClick={onClose} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LocationModal;
