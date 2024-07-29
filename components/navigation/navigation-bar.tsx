"use client";
import { DropDownLinks, NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
// import DropDownItem from "./dropdown-item";

export const NavigationBar = () => {
  const [isClosing, setIsClosing] = useState(false);
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>([]);
  const [ref, setRef] = useState<HTMLButtonElement | null>(null);
  const [dropdown, setDropdown] = useState("");
  // const refPosition = ref?.getBoundingClientRect().left.toFixed(2);
  const links = useMemo(() => {
    return DropDownLinks.filter((link) => link.id === dropdown);
  }, [dropdown]);

  const { isOpen, onOpen, data, onClose } = useModal();

  // useEffect(() => {
  //   isOpen && setRef(null);
  // }, [isOpen]);

  // useEffect(() => {
  //   isOpen && setDropdown("");
  // }, [isOpen]);

  // Initialize the refs array if it hasn't been initialized yet
  if (refs.current.length !== NavBarLinks.length) {
    refs.current = Array(NavBarLinks.length)
      .fill(null)
      .map((_, i) => refs.current[i] || React.createRef<HTMLButtonElement>());
  }

  const handleClick = (buttonRef: RefObject<HTMLButtonElement>) => {
    if (isOpen) {
      onClose();
    } else {
      // const refPosition = buttonRef?.current
      //   ?.getBoundingClientRect()
      //   .left.toFixed(2);

      onOpen("DROPDOWN", { refPosition: buttonRef });
    }
  };

  // const handleClick = (buttonRef: HTMLButtonElement) => {
  //   if (ref?.innerHTML === buttonRef.innerHTML) {
  //     setIsClosing(true);
  //     setTimeout(() => {
  //       setIsClosing(false);
  //       setRef(null);
  //     }, 5000);
  //   } else {
  //     setIsClosing(true);
  //     setTimeout(() => {
  //       setIsClosing(false);
  //       setRef(buttonRef);
  //     }, 5000);
  //   }
  // };

  // const handleClick = (label: string) => {
  //   if (label === dropdown) {
  //     setIsClosing(true);
  //     setTimeout(() => {
  //       setIsClosing(false);
  //       setDropdown("");
  //     }, 1000);
  //   } else {
  //     setIsClosing(true);
  //     setTimeout(() => {
  //       setIsClosing(false);
  //       setDropdown(label);
  //     }, 1000);
  //   }
  // };

  useEffect(() => {
    if (dropdown !== "") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [dropdown]);

  return (
    <>
      <nav className="top-0 bg-white w-full shadow-md h-[75px] sticky flexCenter gap-x-4 border-b max-w-full mx-auto z-[47]">
        {/* <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4 bg-red-600"> */}
        <Image
          src="/Target_Bullseye-Logo_Red.jpg"
          alt="target"
          width={40}
          height={40}
        />
        {NavBarLinks.map((link, index) => (
          <NavigationLink
            key={link.key}
            text={link.text}
            id={link.key}
            links={links}
            onClick={() => handleClick(refs.current[index])}
            // onClick={() => handleClick(link.text)}
            isSelected={dropdown}
            isClosing={isClosing}
            dropDownRef={refs.current[index]}
          />
        ))}
        {/* <Button
            type="button"
            center
            secondary
            className="relative z-30 bg-blue-400"
            onClick={() => handleClick("Categories")}
            refObject={dropDownRef}
          >
            Categories
          </Button>
          <Button
            type="button"
            center
            secondary
            className="relative z-30 bg-blue-400"
            onClick={() => handleClick("Categories")}
            refObject={dropDownRef}
          >
            Categories
          </Button> */}
        <p className="">searchbar</p>
        <p>sign in</p>
        <p>Cart</p>
        {/* </div> */}
      </nav>
      {dropdown !== "" && !isOpen && (
        // <div>
        //   <div
        //     className={cn(
        //       "absolute bg-white z-[35] overflow-hidden transition-all",
        //       ref && !isClosing && "animate-slideDown",
        //       isClosing && "animate-slideUp"
        //     )}
        //     style={{ left: `${refPosition}px` }}
        //   >
        //     {links.map((link) => (
        //       <DropDownItem key={link.text} text={link.text} />
        //     ))}
        //   </div>
        <button
          className="bg-black fixed left-0 right-0 bottom-0 w-full h-[calc(100vh-75px)] bg-opacity-50 backdrop-blur-sm z-30"
          // onClick={() => setRef(null)}
          onClick={() => setDropdown("")}
        />
        // </div>
      )}
    </>
  );
};
