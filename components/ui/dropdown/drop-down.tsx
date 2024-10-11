import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

type DropDownProps = {
  link: {
    key: string;
    text: string;
    children: {
      href: string;
      text: string;
    }[];
  };
  isDropdownOpen: number | null;
  isClosing: boolean;
  linkIndex: number;
  handleNavLinkClick: (i: number) => void;
};

export const DropDown = ({
  link,
  isDropdownOpen,
  isClosing,
  linkIndex,
  handleNavLinkClick,
}: DropDownProps) => {
  return (
    <div className="relative w-auto group" key={link.key}>
      <Button
        type="button"
        secondary
        start
        onClick={() => handleNavLinkClick(linkIndex)}
        fullWidth
      >
        <p className="text-base pr-2 whitespace-nowrap">{link.text}</p>
        <ChevronUp
          size={16}
          strokeWidth={1.25}
          className={cn(
            "transform group-hover:scale-100 scale-0 origin-center transition-all duration-[250] rotate-180 ease-in absolute top-[0.8rem] right-0",
            isDropdownOpen === linkIndex && "rotate-0 scale-100"
          )}
        />
      </Button>
      {link.children && isDropdownOpen === linkIndex && (
        <div
          className={cn(
            isDropdownOpen === linkIndex && "animate-slideDown origin-top",
            isClosing === true && "animate-slideUp",
            "absolute bg-white top-[3.605rem] flex flex-col w-80 border-t px-4 max-h-[36rem] overflow-y-auto rounded-br-md rounded-bl-md custom-scrollbar"
          )}
        >
          {linkIndex === 0 && (
            <div className="min-h-16 border-b flexStart">
              <h3 className="text-lg base font-semibold">All Categories</h3>
            </div>
          )}
          {link.children.map((sublink, i) => (
            <Link key={i} href={sublink.href}>
              <div className="w-full h-10 border-b flexStart">
                <p className="text-base whitespace-nowrap">{sublink.text}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
