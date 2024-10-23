"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { PasswordHint } from "./password-hint";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  emailRegex,
  letterRegex,
  mobileNumberLength,
  mobileNumberRegex,
  nameMaxLength,
  nameMinLength,
} from "@/lib/constants";
import { validatePasswords } from "@/lib/validate-password";
import { KeepMeSignedIn } from "./keep-me-signed-in";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/format-phone-number";
import { validateEmailAndMobileNunber } from "@/lib/validate-email-phone-number";
import { formatEmailAddress } from "@/lib/format-email-address";
import { AuthFormToggle } from "./auth-form-toggle";
import { AuthContext } from "@/providers/auth-form-provider";
import { AuthLegal } from "./auth-legal";

export const AuthForm = () => {
  const { registerForm, loginForm, toggleState, toggleForgotPassword } =
    useContext(AuthContext);
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
      username: "",
    },
  });

  const phoneNumber = watch("mobileNumber", "");
  const password = watch("password", "");
  const emailAddress = watch("email", "");

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
            data,
            callbackUrl: "/",
          })
        )
        .catch((error) => console.log("REGISTER ERROR: " + error));
    }
    if (loginForm) {
      data = {
        ...data,
        rememberMe: keepMeSignedInRef.current?.checked,
      };
      const formattedUsername = formatPhoneNumber(data.email);
      if (formattedUsername !== "") {
        data.email = formattedUsername;
      }
      await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });
    }
  };

  const toggleForm = () => {
    toggleState();
    setShowPasswordCriteria(false);
    reset();
    clearErrors();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
        {loginForm && <KeepMeSignedIn ref={keepMeSignedInRef} />}
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
              pattern={letterRegex}
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
              pattern={letterRegex}
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
              <FormErrorMessage
                errorMessage={errors["mobileNumber"]?.message}
              />
            )}
          </>
        ) : (
          <>
            <Input
              type="text"
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
          </>
        )}
        <Input
          type={showPassword ? "text" : "password"}
          label={registerForm ? "Create password" : "Password"}
          id="password"
          required
          watch={password}
          register={register}
          errors={errors}
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
        {registerForm && (
          <KeepMeSignedIn ref={keepMeSignedInRef} isLabelShown />
        )}
        {registerForm && <AuthLegal />}
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          center
          className="text-xl my-4"
        >
          {registerForm ? "Create account" : "Sign in with password"}
        </Button>
      </form>
      {loginForm && (
        <Button
          secondary
          type="button"
          disabled={isSubmitting}
          center
          onClick={toggleForgotPassword}
          className="mb-4 hover:bg-white underline hover:no-underline"
        >
          Forgot password?
        </Button>
      )}
      <AuthFormToggle registerForm={registerForm} toggleForm={toggleForm} />
    </>
  );
};
