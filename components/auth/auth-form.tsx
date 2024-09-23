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
        watch={watch("email")}
        register={register}
        errors={errors}
      />
      <Input
        type="text"
        label="First Name"
        id="firstName"
        watch={watch("firstName")}
        register={register}
        errors={errors}
      />
      <Input
        type="text"
        label="Last Name"
        id="lastName"
        watch={watch("lastName")}
        register={register}
        errors={errors}
      />
      <Input
        type="tel"
        label="Mobile phone number (optional)"
        id="mobileNumber"
        watch={watch("mobileNumber")}
        register={register}
        errors={errors}
      />
      <Input
        type="password"
        label="Create password"
        id="password"
        watch={watch("password")}
        register={register}
        errors={errors}
      />
    </form>
  );
};
