"use client";
import React, { useCallback, useContext, useState } from "react";

const DropDownContext = React.createContext("");
const DropDownContextUpdate = React.createContext(() => {});

export const useDropDown = () => {
  return useContext(DropDownContext);
};

export const useUpdateDropDown = () => {
  return useContext(DropDownContextUpdate);
};

export const DropDownProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDropDown, setIsDropDown] = useState("");

  const ToggleDropDown = useCallback(() => {
    return setIsDropDown("");
  }, [isDropDown]);
  return (
    <DropDownContext.Provider value={isDropDown}>
      <DropDownContextUpdate.Provider value={ToggleDropDown}>
        {children}
      </DropDownContextUpdate.Provider>
    </DropDownContext.Provider>
  );
};
