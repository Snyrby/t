"use client";

import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { PasswordHint } from "./password-hint";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  emailRegex,
  mobileNumberLength,
  mobileNumberRegex,
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
} from "@/lib/constants";
import { validatePasswords } from "@/lib/validate-password";
import { KeepMeSignedIn } from "./keep-me-signed-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Variant = "LOGIN" | "REGISTER" | "";

type AuthFormProps = {
  action: string | null;
};

export const AuthForm = ({ action }: AuthFormProps) => {
  const [variant, setVariant] = useState<Variant>("");
  const keepMeSignedInRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    action === "create_session_signin"
      ? setVariant("LOGIN")
      : setVariant("REGISTER");
  }, []);

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

  const phoneNumber = watch("mobileNumber", "");
  const password = watch("password", "");
  const registerForm = variant === "REGISTER";

  useEffect(() => {
    validatePasswords({ password, setPasswordCriteria });
  }, [password]);

  useEffect(() => {
    const formattedNumber = formatPhoneNumber(phoneNumber as string);
    if (formattedNumber !== phoneNumber) {
      setValue("mobileNumber", formattedNumber);
    }
  }, [phoneNumber, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.mobileNumber !== "") {
      data = {
        ...data,
        rememberMe: keepMeSignedInRef.current?.checked,
      };
    } else {
      data = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        rememberMe: keepMeSignedInRef.current?.checked,
      };
    }
    await axios
      .post("/api/register", data)
      .then(() =>
        signIn("credentials", { ...data, rememberMe: false, callbackUrl: "/" })
      )
      .catch((error) => console.log("REGISTER ERROR: " + error));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      <Input
        type="email"
        label={registerForm ? "Email address" : "Email or mobile phone"}
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
      {registerForm && (
        <>
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
        </>
      )}
      <Input
        type={showPassword ? "text" : "password"}
        label={registerForm ? "Create password" : "Password"}
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
      {showPasswordCriteria && registerForm && (
        <PasswordHint passwordCriteria={passwordCriteria} />
      )}
      {registerForm && <KeepMeSignedIn ref={keepMeSignedInRef} isLabelShown />}
      <Button
        type="submit"
        disabled={isSubmitting}
        fullWidth
        center
        className="text-xl mt-6"
      >
        {registerForm ? "Create account" : "Sign in with password"}
      </Button>
      {!registerForm && (
        <Button
          type="button"
          center
          secondary
          fullWidth
          className="outline outline-1 text-xl"
          onClick={() => setVariant("REGISTER")}
        >
          Create your Target Account
        </Button>
      )}
      {registerForm && (
        <Link href="#" onClick={() => setVariant("LOGIN")} className="flexCenter underline text-[#666666] hover:text-black">
          Or sign in
        </Link>
      )}
    </form>
  );
};
