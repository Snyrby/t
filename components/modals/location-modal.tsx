import { useModal } from "@/hooks/use-modal-store";
import { on } from "events";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export const LocationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (type !== "LOCATION" || isOpen === false) {
    return null;
  }
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 h-full bg-white w-96 shadow-lg transform transition-transform duration-300">
        <div className="flex flex-col ml-3 mr-6">
          <div className="flex my-3 justify-between">
            <p className="text-lg">Update shipping location</p>
            <div className="bg-gray-200 opacity-50 rounded-full transition hover:opacity-100 size-8 flex justify-center items-center">
              <X onClick={onClose} className="cursor-pointer" size={28} />
            </div>  
          </div>
          <div className="border" />
          <p className="text-sm my-4">Item availability and shipping options will change based on location.</p>
          <div className="relative p-[10px]">
            <label htmlFor="zipcode" className="absolute top-[-1px] left-5">
              Zip code
            </label>
            <input type="text" name="zipcode" id="zipcode" className="border-[1px] border-black rounded-sm"/>
          </div>
        </div>
        <div />
      </aside>
      <button className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30" onClick={() => onClose()} />
    </>
  );
};

