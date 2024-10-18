import { authFooterLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export const AuthFooter = () => {
  return (
    <div className="w-screen">
      <div className="h-52 w-full bg-gradient-to-r from-[#f7f7f7] to-[#eee]">
        <Image
          alt="Target: Expect More. Pay Less."
          src="/target_auth.svg"
          width={600}
          height={1}
          className="h-full mx-auto"
        />
      </div>
      <div className="bg-[#333333] w-full h-auto min-h-14">
        <div className="flex flex-wrap items-end justify-center w-full">
          {authFooterLinks.map((link) => (
            <Link key={link.text} href={link.href} className="text-xs text-white hover:text-slate-200">
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
