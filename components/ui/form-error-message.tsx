import React from "react";

type FormErrorMessageProps = {
  errorMessage: string;
};

export const FormErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
  return <p className="text-xs">{errorMessage}</p>;
};
