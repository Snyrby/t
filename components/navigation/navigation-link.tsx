"use client"

import { Button } from "@/components/ui/button";
import { DropDownLinks } from "@/constants";
import { useDropDown } from "@/providers/dropdown-context";

type NavigationLink = {
  text: string;
  id: string;
};

const NavigationLink = ({ text, id }: NavigationLink) => {
  // console.log(id);
  // console.log(isSelected);
  const links = DropDownLinks.filter((link) => link.id === id)
  // console.log(links);
  const dropdown = useDropDown();
  console.log(dropdown);
  
  
  
  return (
  <Button type="button" center secondary className="relative">
    {text}
    {/* {isSelected === id && <div className="absolute top-8">
      {text}
    </div>} */}
  </Button>);
};

export default NavigationLink;
