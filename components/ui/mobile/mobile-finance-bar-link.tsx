import Link from "next/link";

type MobileFinanceBarLinkProps = {
  link: {
    href: string;
    text: string;
    key: string;
  };
};

export const MobileFinanceBarLink = ({ link }: MobileFinanceBarLinkProps) => {
  return (
    <Link
      className="flex flex-col mx-4 border-b-2 hover:underline focus:underline focus-visible:outline-none"
      href={link.href}
    >
      <p className="my-2 text-sm ">{link.text}</p>
    </Link>
  );
};
