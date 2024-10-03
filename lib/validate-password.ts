import { SetStateAction } from "react";
import {
  lowercaseRegex,
  numberRegex,
  passwordMaxLength,
  passwordMinLength,
  specialCharRegex,
  uppercaseRegex,
} from "./constants";

type validatePasswordProps = {
  password: string;
  setPasswordCriteria?: (
    value: SetStateAction<{
      length: boolean;
      lowercase: boolean;
      uppercase: boolean;
      number: boolean;
      specialChar: boolean;
      minTwoCriteria: boolean;
    }>
  ) => void;
};

export const validatePasswords = ({
  password,
  setPasswordCriteria,
}: validatePasswordProps) => {
  const length =
    password.length >= passwordMinLength &&
    password.length <= passwordMaxLength;
  const lowercase = lowercaseRegex.test(password);
  const uppercase = uppercaseRegex.test(password);
  const number = numberRegex.test(password);
  const specialChar = specialCharRegex.test(password);

  // Count how many criteria are met
  const criteriaMet = [lowercase, uppercase, number, specialChar].filter(
    Boolean
  ).length;
  const minTwoCriteria = criteriaMet >= 2;
  if (setPasswordCriteria !== undefined) {
    setPasswordCriteria({
      length,
      lowercase,
      uppercase,
      number,
      specialChar,
      minTwoCriteria,
    });
  }
  if (minTwoCriteria) {
    return true;
  } else {
    return "Please enter a valid password";
  }
};
