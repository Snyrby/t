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
        className="h-[40px] bg-blue-300"
      >
        Target Component
      </div>
  );
};
