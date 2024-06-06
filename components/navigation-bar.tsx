import { cn } from "@/lib/utils"

type NavigationBarProps = {
    isInView: boolean
}

export const NavigationBar = ({
    isInView
}: NavigationBarProps) => {
  return (
    <div 
        className={cn(
            "top-0 bg-blue-600 w-full h-[50px] sticky",
        )}
      >
        This component becomes fixed when the target component is not in view.
      </div>
  )
}