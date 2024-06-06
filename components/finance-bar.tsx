import { cn } from "@/lib/utils";

type FinaceBarProps = {
    targetRef: React.RefObject<HTMLDivElement>
    
}

export const FinanceBar = ({
    targetRef,
}: FinaceBarProps) => {
  return (
      <div
        ref={targetRef}
        className="h-[50px] bg-[#cc0000]"
      >
        <div className="flex justify-between mx-auto my-0">
          <div className="ml-6 h-full items-center justify-start">
            Location
            Store
          </div>
          <div className="mr-4">
            Target Circle
            Target Circle Card
            Target Circle 360
          </div>
        </div>
      </div>
  );
};
