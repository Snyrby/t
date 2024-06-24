"use client"

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/constants";
import { useState } from "react";

type NavigationLink = {
  text: string;
  onClick: () => void;
  isSelected?: string;
  id: string;
};

const NavigationLink = ({ text, onClick, isSelected, id }: NavigationLink) => {
  // console.log(id);
  // console.log(isSelected);
  const links = DropDownLinks.filter((link) => link.id === id)
  console.log(links);
  
  
  return (
  <Button type="button" center secondary className="relative" onClick={onClick}>
    {text}
    {isSelected === id && <div className="absolute top-8">
      {text}
    </div>}
  </Button>);
};

export default NavigationLink;
