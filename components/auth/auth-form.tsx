import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/components/ui/form-error-message";
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
        required
        watch={watch("email")}
        register={register}
        errors={errors}
      />
      {typeof errors["email"]?.message == "string" && (
        <FormErrorMessage errorMessage={errors["email"]?.message} />
      )}
      <Input
        type="text"
        label="First Name"
        id="firstName"
        required
        watch={watch("firstName")}
        register={register}
        errors={errors}
      />
      {typeof errors["firstName"]?.message == "string" && (
        <FormErrorMessage errorMessage={errors["firstName"]?.message} />
      )}
      <Input
        type="text"
        label="Last Name"
        id="lastName"
        required
        watch={watch("lastName")}
        register={register}
        errors={errors}
      />
      {typeof errors["lastName"]?.message == "string" && (
        <FormErrorMessage errorMessage={errors["lastName"]?.message} />
      )}
      <Input
        type="tel"
        label="Mobile phone number (optional)"
        id="mobileNumber"
        watch={watch("mobileNumber")}
        register={register}
        errors={errors}
      />
      <p className="">
        {typeof errors["mobileNumber"]?.message == "string" &&
          errors["mobileNumber"]?.message}
      </p>
      <Input
        type={showPassword ? "text" : "password"}
        label="Create password"
        id="password"
        required
        watch={watch("password")}
        register={register}
        errors={errors}
        maxLength={20}
        minLength={8}
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
      {typeof errors["password"]?.message == "string" && (
        <FormErrorMessage errorMessage="Please enter your password" />
      )}
      <button type="submit">btn</button>
    </form>
  );
};
