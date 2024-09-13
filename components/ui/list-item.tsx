import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ListItemProps = {
  children?: React.ReactNode;
  href?: string;
  text?: string;
  imageURL?: string;
  className?: string;
  between?: boolean;
  bigLink?: boolean;
  noUnderline?: boolean;
};

export const ListItem = ({
  children,
  href,
  text,
  imageURL,
  className,
  between,
  bigLink,
  noUnderline
}: ListItemProps) => {
  return (
    <li
      className={cn(
        "no-hover-on-focus-underline focus-within:list-outside focus-within:list-disc h-14 relative",
        !noUnderline && "underline-divider",
        className
      )}
    >
      <Link
        href={href as string}
        className={cn(
          "focus-visible:outline-none h-full px-4 py-3 list-dot",
          between && !bigLink && "flexBetween",
          bigLink
            ? "flex flex-col justify-center items-start pl-8 pr-4"
            : "px-4",
          !bigLink && !between && "flexStart"
        )}
      >
        {!children && !imageURL && <span>{text}</span>}
        {!children && imageURL && (
          <Image alt="Target Circle" src={imageURL} width={80} height={80} />
        )}
        {children}
      </Link>
    </li>
  );
};
