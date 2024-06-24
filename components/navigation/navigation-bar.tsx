import { NavBarLinks } from "@/constants";
import Image from "next/image";
import NavigationLink from "./navigation-link";

export const NavigationBar = () => {
  return (
    <div className="top-0 bg-white w-full h-[75px] sticky flex border-b">
      <div className="max-w-[1400px] mx-auto h-full flexCenter gap-x-4">
        <Image
          src="/Target_Bullseye-Logo_Red.jpg"
          alt="target"
          width={40}
          height={40}
        />
        {NavBarLinks.map((link) => (
          <NavigationLink key={link.key} text={link.text} />
        ))}
        <p className="">searchbar</p>
        <p>sign in</p>
        <p>Cart</p>
      </div>
    </div>
  );
};
