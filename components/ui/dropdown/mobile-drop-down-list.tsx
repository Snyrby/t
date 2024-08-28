import { NavBarLinks } from "@/lib/constants";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

type MobileDropDownListProps = {
  index: number;
  links: {
    href: string;
    text: string;
    imageURL?: string;
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
    <div className="flex justify-between flex-wrap gap-y-4 my-4 gap-x-0 w-full">
      {index !== 0 ? (
        <>
          {links.map((link) => (
            <Link href={link.href} key={link.text} className="flex flex-col justify-start mr-2 items-center text-wrap w-[70px] group">
            <Image
              alt={link.text}
              src={link?.imageURL as string}
              width={70}
              height={70}
              className="rounded-full"
            />
            <p className="text-xs text-center pt-3 group-hover:underline">{link.text}</p>
          </Link>
          ))}
        </>
      ) : (
        <>
          {sortedLinks?.map((link) => (
            <Link href={link.href} key={link.text} className="flex flex-col justify-start mr-2 items-center text-wrap w-[70px] group">
              <Image
                alt={link.text}
                src={link?.imageURL as string}
                width={70}
                height={70}
                className="rounded-full"
              />
              <p className="text-xs text-center pt-3 group-hover:underline">{link.text}</p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
