"use client"
import { NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";
import { useState } from "react";

export const NavigationBar = () => {
  const [isSelected, setIsSelected] = useState("");
  return (
    <nav className="top-0 bg-white w-full h-[75px] sticky flex border-b">
      <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4">
        <Image
          src="/Target_Bullseye-Logo_Red.jpg"
          alt="target"
          width={40}
          height={40}
        />
        {NavBarLinks.map((link) => (
          <NavigationLink key={link.key} text={link.text} onClick={() => setIsSelected(link.key)} isSelected={isSelected} id={link.key} />
        ))}
        <p className="">searchbar</p>
        <p>sign in</p>
        <p>Cart</p>
      </div>
    </nav>
  );
};
