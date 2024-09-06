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
    <li className="border-b noHoverOnFocusUnderline focus-within:list-outside focus-within:list-disc h-10">
      {!children && !imageURL && (
        <Link href={href as string} className="focus-visible:outline-none h-full flexStart">
          {text}
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
