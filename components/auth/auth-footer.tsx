import { AuthFooterLinks } from "./auth-footer-links";

export const AuthFooter = () => {
  return (
    <div className="w-screen">
      <div className="h-[212px] w-full bg-gradient-to-r from-[#f7f7f7] to-[#eee]">
        <img
          alt="Target: Expect More. Pay Less."
          src="/target_auth.svg"
          className="h-full w-full mx-auto max-w-[500px] object-cover"
        />
      </div>
      <AuthFooterLinks />
    </div>
  );
};
