import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ListItemProps = {
  children?: React.ReactNode;
  href?: string;
  text?: string;
  imageURL?: string;
  className?: string;
};

export const ListItem = ({
  children,
  href,
  text,
  imageURL,
  className,
}: ListItemProps) => {
  return (
    <li
      className={cn(
        "no-hover-on-focus-underline focus-within:list-outside focus-within:list-disc h-14 underline-divider relative",
        className
      )}
    >
      {!children && !imageURL && (
        <Link
          href={href as string}
          className="focus-visible:outline-none h-full flexStart px-4 py-3 list-dot"
        >
          <span>{text}</span>
        </Link>
      )}
      {!children && imageURL && (
        <Link
          href={href as string}
          className="focus-visible:outline-none flexStart px-4 py-3 h-full list-dot"
        >
          <Image alt="Target Circle" src={imageURL} width={80} height={80} />
        </Link>
      )}
      {children}
    </li>
  );
};
