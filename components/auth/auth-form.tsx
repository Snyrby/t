import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
type Variant = "LOGIN" | "REGISTER" | "";

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("");
  const [showPassword, setShowPassword] = useState(false);
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
        type={showPassword ? "text" : "password"}
        label="Create password"
        id="password"
        watch={watch("password")}
        register={register}
        errors={errors}
      >
        <div className="flex items-center absolute right-2 top-2.5 justify-end">
          <button
            type="button"
            className="underline decoration-gray-400 underline-offset-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>
      </Input>
    </form>
  );
};
