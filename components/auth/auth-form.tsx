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
import { formatPhoneNumber } from "@/lib/format-phone-number";
import { validateEmailAndMobileNunber } from "@/lib/validate-email-phone-number";
import { formatEmailAddress } from "@/lib/format-email-address";
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
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
  });

  const phoneNumber = watch("mobileNumber", "");
  const password = watch("password", "");
  const emailAddress = watch("email", "");
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

  useEffect(() => {
    const formattedEmail = formatEmailAddress(emailAddress as string);
    if (formattedEmail !== emailAddress) {
      setValue("email", formattedEmail);
    }
  }, [emailAddress, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (registerForm) {
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
          signIn("credentials", {
            ...data,
            rememberMe: false,
            callbackUrl: "/",
          })
        )
        .catch((error) => console.log("REGISTER ERROR: " + error));
    } else {
      data = {
        ...data,
        rememberMe: keepMeSignedInRef.current?.checked,
      };
      const formattedUsername = formatPhoneNumber(data.email);
      if (formattedUsername !== "") {
        data.email = formattedUsername;
      }
      console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      {!registerForm && <KeepMeSignedIn ref={keepMeSignedInRef} />}
      {registerForm ? (
        <>
          <Input
            type="email"
            label="Email address"
            id="email"
            required
            watch={emailAddress}
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
            watch={password}
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
        </>
      ) : (
        <>
          <Input
            type="email"
            label="Email or mobile number"
            id="email"
            required
            maxLength={nameMaxLength}
            watch={emailAddress}
            register={register}
            errors={errors}
            disabled={isSubmitting}
            validate={() => validateEmailAndMobileNunber(emailAddress)}
          />
          {typeof errors["email"]?.message == "string" && (
            <FormErrorMessage errorMessage={errors["email"]?.message} />
          )}
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            id="password"
            required
            watch={password}
            register={register}
            errors={errors}
            validate={() => validatePasswords({ password })}
            disabled={isSubmitting}
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
        </>
      )}
      {showPasswordCriteria && (
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
          onClick={() => {
            setVariant("REGISTER");
            reset();
            clearErrors();
          }}
        >
          Create your Target Account
        </Button>
      )}
      {registerForm && (
        <Link
          href="#"
          onClick={() => {
            setVariant("LOGIN");
            setShowPasswordCriteria(false);
            reset();
            clearErrors();
          }}
          className="flexCenter underline text-[#666666] hover:text-black"
        >
          Or sign in
        </Link>
      )}
    </form>
  );
};
