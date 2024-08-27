import { NavBarLinks } from "@/lib/constants";
import { useMemo } from "react";
import Image from "next/image";

type MobileDropDownListProps = {
  index: number;
  links: {
    href: string;
    text: string;
  }[];
};

export const MobileDropDownList = ({
  index,
  links,
}: MobileDropDownListProps) => {
  const sortedLinks = useMemo(
    () =>
      NavBarLinks.at(0)
        ?.children.filter((link) => link?.index !== undefined)
        .sort((a, b) => a.index - b.index),
    [NavBarLinks]
  );
  return (
    <div className="grid grid-cols-4">
      {index !== 0 ? (
        <>
          {links.map((link) => (
            <p className="">{link.text}</p>
          ))}
        </>
      ) : (
        <>
          {sortedLinks.map((link) => (
            <p className="">{link.text}</p>
          ))}
        </>
      )}
    </div>
  );
};
