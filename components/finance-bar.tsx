import { cn } from "@/lib/utils";

type FinaceBarProps = {
  targetRef: React.RefObject<HTMLDivElement>;
};

export const FinanceBar = ({ targetRef }: FinaceBarProps) => {
  return (
    <div ref={targetRef} className="h-[50px] target-red w-full">
      <div className="flex justify-between items-center mx-auto my-0 h-full max-w-[1400px]">
        <div className="h-full flex items-center justify-start gap-x-4">
          <div className="hover:cursor-pointer">Location</div>
          <div className="hover:cursor-pointer">Store</div>
        </div>
        <div className="mr-4 flex">
          <div className="">Target Circle</div>
          <div className="">Target Circle Card</div>
          <div className="">Target Circle 360</div>
        </div>
      </div>
    </div>
  );
};
