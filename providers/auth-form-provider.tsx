import { Variant } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

const initAuthContext: {
  registerForm: boolean;
  toggleState: () => void;
  toggleForgotPassword: () => void;
} = {
  registerForm: false,
  toggleState: () => {},
  toggleForgotPassword: () => {},
};

export const AuthContext = createContext(initAuthContext);

type AuthFormProviderProps = {
  children?: React.ReactNode;
};

export const AuthFormContextProvider = ({
  children,
}: AuthFormProviderProps) => {
  const searchParams = useSearchParams();
  const action = searchParams.get("actions");
  const [variant, setVariant] = useState<Variant>("");
  useEffect(() => {
    action === "create_session_signin"
      ? setVariant("LOGIN")
      : setVariant("REGISTER");
  }, [action]);

  const toggleState = () =>
    variant === "REGISTER" ? setVariant("LOGIN") : setVariant("REGISTER");

  const toggleForgotPassword = () => setVariant("FORGOT");

  const value = useMemo(() => {
    return {
      toggleState,
      toggleForgotPassword,
      registerForm: variant === "REGISTER",
    };
  }, [variant]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
