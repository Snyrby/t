"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { PasswordHint } from "./password-hint";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  emailRegex,
  lowercaseRegex,
  mobileNumberLength,
  mobileNumberRegex,
  nameMaxLength,
  nameMinLength,
  numberRegex,
  passwordMaxLength,
  passwordMinLength,
  specialCharRegex,
  uppercaseRegex,
} from "@/lib/constants";
import { validatePasswords } from "@/lib/validate-password";
type Variant = "LOGIN" | "REGISTER" | "";

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("");
  const session = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minTwoCriteria: false,
  });
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
  });

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "");

    // Format the phone number based on the length of the input
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  // const validatePasswords = (password: string) => {
  //   const length = password.length >= passwordMinLength && password.length <= passwordMaxLength;
  //   const lowercase = lowercaseRegex.test(password);
  //   const uppercase = uppercaseRegex.test(password);
  //   const number = numberRegex.test(password);
  //   const specialChar = specialCharRegex.test(password);

  //   // Count how many criteria are met
  //   const criteriaMet = [lowercase, uppercase, number, specialChar].filter(
  //     Boolean
  //   ).length;
  //   const minTwoCriteria = criteriaMet >= 2;
  //   setPasswordCriteria({
  //     length,
  //     lowercase,
  //     uppercase,
  //     number,
  //     specialChar,
  //     minTwoCriteria,
  //   });
  //   if (minTwoCriteria) {
  //     return true;
  //   } else {
  //     return "Please enter a valid password";
  //   }
  // };

  const phoneNumber = watch("mobileNumber", "");
  const password = watch("password", "");

  useEffect(() => {
    validatePasswords({ password, setPasswordCriteria });
  }, [password]);

  useEffect(() => {
    const formattedNumber = formatPhoneNumber(phoneNumber as string);
    if (formattedNumber !== phoneNumber) {
      setValue("mobileNumber", formattedNumber);
    }
  }, [phoneNumber, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/register", data)
      .then(() => signIn("credentials", data))
      .then(() => router.push("/"))
      .catch((error) => console.log("REGISTER ERROR: " + error));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      <Input
        type="email"
        label="Email address"
        id="email"
        required
        watch={watch("email")}
        maxLength={nameMaxLength}
        register={register}
        errors={errors}
        disabled={isSubmitting}
        pattern={emailRegex}
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
        maxLength={nameMaxLength}
        minLength={nameMinLength}
        register={register}
        errors={errors}
        disabled={isSubmitting}
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
        maxLength={nameMaxLength}
        minLength={nameMinLength}
        register={register}
        errors={errors}
        disabled={isSubmitting}
      />
      {typeof errors["lastName"]?.message == "string" && (
        <FormErrorMessage errorMessage={errors["lastName"]?.message} />
      )}
      <Input
        type="tel"
        label="Mobile phone number (optional)"
        id="mobileNumber"
        watch={phoneNumber}
        register={register}
        errors={errors}
        maxLength={mobileNumberLength}
        minLength={mobileNumberLength}
        disabled={isSubmitting}
        pattern={mobileNumberRegex}
      />
      {typeof errors["mobileNumber"]?.message == "string" && (
        <FormErrorMessage errorMessage={errors["mobileNumber"]?.message} />
      )}
      <Input
        type={showPassword ? "text" : "password"}
        label="Create password"
        id="password"
        required
        watch={watch("password")}
        register={register}
        errors={errors}
        maxLength={passwordMaxLength}
        minLength={passwordMinLength}
        disabled={isSubmitting}
        validate={() => validatePasswords({ password })}
        setShowPasswordCriteria={setShowPasswordCriteria}
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
        <FormErrorMessage errorMessage={errors["password"]?.message} />
      )}
      {showPasswordCriteria && (
        <PasswordHint passwordCriteria={passwordCriteria} />
      )}
      <button type="submit" disabled={isSubmitting}>
        btn
      </button>
    </form>
  );
};
