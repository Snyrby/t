import { cn } from "@/lib/utils";
import { AuthContext } from "@/providers/auth-form-provider";
import Link from "next/link";
import { useContext } from "react";

export const AuthLegal = () => {
  const { registerForm } = useContext(AuthContext);
  return (
    <>
      <p
        className={cn(
          "text-[0.67rem] leading-4 text-[#666666]",
          !registerForm && "mt-8"
        )}
      >
        {!registerForm
          ? "By signing in, you agree to the following:"
          : `By creating an account, you are agreeing to the Target terms & conditions and Target privacy policy, including receipt of 
        Target exclusive email offers and promotions. To manage your marketing choices please access
        the Choice section of the Target Privacy Policy or call Target Guest Relations. Message and data rates may apply when 
        including a phone number.`}
      </p>
      <div
        className={cn(
          "flex justify-center items-center flex-col h-[4.25rem]",
          registerForm && "mt-4"
        )}
      >
        <Link
          href="/"
          className={cn(
            "underline hover:no-underline dotted-outline-no-underline-on-focus",
            !registerForm ? "text-xs text-blue-600" : "text-[#666666]"
          )}
        >
          Terms & Conditions
        </Link>
        <Link
          href="/"
          className={cn(
            "underline hover:no-underline mt-3 dotted-outline-no-underline-on-focus",
            !registerForm ? "text-xs text-blue-600" : "text-[#666666]"
          )}
        >
          Privacy Policy
        </Link>
      </div>
    </>
  );
};
