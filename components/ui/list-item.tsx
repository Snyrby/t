import Image from "next/image";
import Link from "next/link";

type ListItemProps = {
  children?: React.ReactNode;
  href?: string;
  text?: string;
  imageURL?: string;
};

export const ListItem = ({ children, href, text, imageURL }: ListItemProps) => {
  return (
    <li className="no-hover-on-focus-underline focus-within:list-outside focus-within:list-disc h-10 underline-divider">
      {!children && !imageURL && (
        <Link href={href as string} className="focus-visible:outline-none h-full flexStart px-4 py-3 list-dot">
          <span>{text}</span>
        </Link>
      )}
      {!children && imageURL && (
        <Link href={href as string} className="focus-visible:outline-none h-full">
          <Image alt="Target Circle" src={imageURL} width={80} height={80} />
        </Link>
      )}
      {children}
    </li>
  );
};
