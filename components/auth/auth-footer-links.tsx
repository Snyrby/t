import { authFooterLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const AuthFooterLinks = () => {
  return (
    <div className="bg-[#333333] w-full h-auto min-h-14">
      <div className="flex flex-wrap items-center justify-center w-full gap-x-5">
        {authFooterLinks.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className={cn(
              "text-xs text-white hover:text-slate-300 dotted-outline-on-focus hover:outline-0",
              link.imageURL && "flexCenter gap-x-2"
            )}
          >
            {link.imageURL && (
              <img
                src="/target_survey.svg"
                alt={link.text}
                className="size-6"
              />
            )}
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};
