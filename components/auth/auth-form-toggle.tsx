import { Button } from "@/components/ui/button";
import Link from "next/link";

type AuthFormToggleProps = {
  registerForm: boolean;
  toggleForm: () => void;
};

export const AuthFormToggle = ({
  registerForm,
  toggleForm,
}: AuthFormToggleProps) => {
  return (
    <>
      {!registerForm && (
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
