import Image from "next/image";

type AuthHeaderProps = {
  action: string | null;
};

export const AuthHeader = ({ action }: AuthHeaderProps) => {

  return (
    <>
      <Image
        src="/Target_Bullseye-Logo_Red.jpg"
        alt="target"
        width={35}
        height={35}
      />
      <h1 className="mt-4 mb-2 tracking-tighter font-bold text-2xl">{action === "create_session_signin" ? "Sign into your Target account" : "Create your Target account"}</h1>
    </>
  );
};
