import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
type Variant = "LOGIN" | "REGISTER" | "";

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        type="email"
        label="Email address"
        id="email"
        register={register}
        errors={errors}
      />
      <Input
        type="text"
        label="First Name"
        id="firstName"
        register={register}
        errors={errors}
      />
      <Input
        type="text"
        label="Last Name"
        id="lastName"
        register={register}
        errors={errors}
      />
      <Input
        type="tel"
        label="Mobile phone number (optional)"
        id="mobileNumber"
        register={register}
        errors={errors}
      />
      <Input
        type="password"
        label="Create password"
        id="password"
        register={register}
        errors={errors}
      />
    </form>
  );
};
