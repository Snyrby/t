"use client";
import { SearchBar } from "@/components/ui/search-bar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CircleUser, Menu, ShoppingCart } from "lucide-react";

export const MobileNavBar = () => {
  const router = useRouter();
  return (
    <nav className="md:hidden block target-red h-[115px]">
      <div className="flex-col h-full">
        <div className="flexBetween">
          <Button
            type="button"
            center
            secondary
            className="hover:bg-gray-300/30"
          >
            <Menu color="white" />
          </Button>
          {/* Image Button */}
          <Button
            type="button"
            center
            secondary
            onClick={() => router.push("/")}
            className="rounded-full sticky min-w-[80px]"
          >
            <Image
              src="/Target_Bullseye-Logo_White_transparent.png"
              alt="target"
              width={40}
              height={40}
            />
          </Button>
          <div className="flexCenter">
            <Button
              type="button"
              secondary
              center
              onClick={() => {}}
              className="hover:bg-gray-300/30"
            >
              <CircleUser color="white" strokeWidth={1.25} />
            </Button>
            <Button
              type="button"
              center
              secondary
              className="hover:bg-gray-300/30 sticky"
            >
              <ShoppingCart color="white" strokeWidth={1.25} />
            </Button>
          </div>
        </div>
        {/* Search Bar */}

        <SearchBar mobile />
      </div>
    </nav>
  );
};
