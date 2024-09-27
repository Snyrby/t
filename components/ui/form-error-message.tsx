import React from "react";

type FormErrorMessageProps = {
  errorMessage: string;
};

export const FormErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
  const cleanedErrorMessage = errorMessage.replace("Create", "")
  return <p className="text-xs">{cleanedErrorMessage}</p>;
};
