import Image from "next/image";

export const AuthHeader = () => {
  return (
    <div className="flex flex-col justify-start items-center">
      <Image
        src="/Target_Bullseye-Logo_Red.jpg"
        alt="target"
        width={40}
        height={40}
      />
      <h1 className="">Sign into your Target account</h1>
    </div>
  );
};
