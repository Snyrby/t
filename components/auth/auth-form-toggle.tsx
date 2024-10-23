import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/auth-form-provider";
import Link from "next/link";
import { useContext } from "react";

type AuthFormToggleProps = {
  toggleForm: () => void;
};

export const AuthFormToggle = ({ toggleForm }: AuthFormToggleProps) => {
  const { registerForm, loginForm } = useContext(AuthContext);
  return (
    <>
      {loginForm && (
        <Button
          type="button"
          center
          secondary
          fullWidth
          className="outline outline-[0.1rem] outline-[#666666] text-xl"
          onClick={toggleForm}
        >
          Create your Target Account
        </Button>
      )}
      {registerForm && (
        <Link
          href="#"
          onClick={toggleForm}
          className="flexCenter underline text-[#666666] hover:text-black"
        >
          Or sign in
        </Link>
      )}
    </>
  );
};
