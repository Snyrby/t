import { forwardRef } from "react";

export const KeepMeSignedIn = forwardRef<HTMLInputElement>((ref) => {
  return (
    <div className="flexCenter my-4 gap-x-4">
      <input
        type="checkbox"
        name="keep-me-signed-in"
        id="keep-me-signed-in"
        className="size-10"
        ref={ref}
      />
      <div className="">
        <h2 className="text-base font-medium">Keep me signed in</h2>
        <p className="text-[0.67rem] leading-4">
          By checking this box you won't have to sign in as often on this
          device. For your security, we recommend only checking this box on your
          personal devices.
        </p>
      </div>
    </div>
  );
});
