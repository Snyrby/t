import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type AuthHeaderProps = {
  action: string | null;
};

type Variant = "LOGIN" | "REGISTER";

export const AuthHeader = ({ action }: AuthHeaderProps) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastNameName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
  });
  return (
    <div className="flex flex-col justify-start items-center">
      <Image
        src="/Target_Bullseye-Logo_Red.jpg"
        alt="target"
        width={35}
        height={35}
      />
      <h1 className="">{action === "create_session_signin" ? "Sign into your Target account" : "Create your Target account"}</h1>
    </div>
  );
};
