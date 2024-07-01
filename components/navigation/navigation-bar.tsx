"use client";
import { DropDownLinks, NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import DropDownItem from "./dropdown-item";

export const NavigationBar = () => {
  const [isClosing, setIsClosing] = useState(false);
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>([]);
  const [ref, setRef] = useState<HTMLButtonElement | null>(null);
  const refPosition = ref?.getBoundingClientRect().left.toFixed(2);
  const links = useMemo(() => {
    return DropDownLinks.filter((link) => link.id === ref?.innerHTML);
  }, [ref]);

  const { isOpen } = useModal();

  useEffect(() => {
    isOpen && setRef(null);
  }, [isOpen]);

  // Initialize the refs array if it hasn't been initialized yet
  if (refs.current.length !== NavBarLinks.length) {
    refs.current = Array(NavBarLinks.length)
      .fill(null)
      .map((_, i) => refs.current[i] || React.createRef<HTMLButtonElement>());
  }

  const handleClick = (buttonRef: HTMLButtonElement) => {
    if (ref?.innerHTML === buttonRef.innerHTML) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setRef(null);
      }, 5000);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setRef(buttonRef);
      }, 5000);
    }
  };

  useEffect(() => {
    if (ref) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [ref]);

  // Update the ref position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (ref) {
        setRef(ref);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return (
    <>
      <nav
        className={cn(
          "top-0 bg-white w-full shadow-md h-[75px] sticky flex border-b",
          isOpen ? "z-0" : "z-[48]"
        )}
      >
        <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4">
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
              onClick={() =>
                handleClick(refs.current[index].current as HTMLButtonElement)
              }
              // isSelected={isDropDown}
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
        </div>
      </nav>
      {ref && !isOpen && (
        <div>
          <div
            className={cn(
              "absolute bg-white z-[35] overflow-hidden transition-all",
              ref && !isClosing && "animate-slideDown",
              isClosing && "animate-slideUp"
            )}
            style={{ left: `${refPosition}px` }}
          >
            {links.map((link) => (
              <DropDownItem key={link.text} text={link.text} />
            ))}
          </div>
          <button
            className="bg-black fixed left-0 right-0 bottom-0 w-full h-[calc(100vh-75px)] bg-opacity-50 backdrop-blur-sm z-30"
            onClick={() => setRef(null)}
          />
        </div>
      )}
    </>
  );
};
