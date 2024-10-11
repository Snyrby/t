import { AuthContext } from "@/providers/auth-form-provider";
import Image from "next/image";
import { useContext } from "react";

export const AuthHeader = () => {
  const { registerForm } = useContext(AuthContext);
  return (
    <>
      <Image
        src="/Target_Bullseye-Logo_Red.jpg"
        alt="target"
        width={35}
        height={35}
      />
      <h1 className="mt-4 mb-2 tracking-tighter font-bold text-2xl">
        {!registerForm
          ? "Sign into your Target account"
          : "Create your Target account"}
      </h1>
    </>
  );
};
