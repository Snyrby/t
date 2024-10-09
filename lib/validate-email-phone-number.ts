import { emailRegex } from "./constants";
import { formatPhoneNumber } from "./format-phone-number";

export const validateEmailAndMobileNunber = (value: string) => {
  // Regular expression for validating phone numbers (US format)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  // Check if the input contains invalid characters <, >, (, or )
  const invalidChars = /[<>()]/;
  if (invalidChars.test(value)) {
    return value.replace(/[<>()]/g, "");
  }
  if (!phoneRegex.test(value) && !emailRegex.test(value)) {
    return "Please enter a valid phone number or email address";
  }
  return true;
};
