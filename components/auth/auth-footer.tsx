import Link from "next/link";
import { AuthFooterLinks } from "./auth-footer-links";

export const AuthFooter = () => {
  return (
    <>
      <Link
        className="text-xs tracking-tighter md:whitespace-nowrap text-center mt-14 flexCenter mb-10 hover:underline"
        href="/"
      >
        <span className="font-bold">*See offer details.</span> Restrictions
        apply. Pricing, promotions and availability may vary by location and at
        Target.com
      </Link>
      <div className="h-[212px] w-full bg-gradient-to-r from-[#f7f7f7] to-[#eee]">
        <img
          alt="Target: Expect More. Pay Less."
          src="/target_auth.svg"
          className="h-full w-full mx-auto max-w-[500px] object-cover"
        />
      </div>
      <AuthFooterLinks />
    </>
  );
};
