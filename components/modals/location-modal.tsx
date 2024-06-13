import { useModal } from "@/hooks/use-modal-store";
import { X } from "lucide-react";
import React from "react";

export const LocationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  if (type !== "LOCATION" && isOpen === false) {
    return null;
  }
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 h-full bg-white w-96 shadow-lg transform transition-transform duration-300">
        <div className="">
          <div className="flex my-3 ml-3 mr-6 justify-between">
            <p className="text-lg">Update shipping location</p>
            <div className="bg-gray-200 opacity-50 rounded-full transition hover:opacity-100 size-8 flex justify-center items-center">
              <X onClick={onClose} className="cursor-pointer" size={28} />
            </div>
          </div>
          <div className="border" />
        </div>
        <div />
      </aside>
      <div className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30" />
    </>
  );
};

