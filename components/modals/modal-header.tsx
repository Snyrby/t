import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

type ModalHeaderProps = {
  title: string;
  onClose: () => void;
  category?: boolean;
};

export const ModalHeader = ({ title, onClose, category }: ModalHeaderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flexBetween my-3 pb-3 border-b h-16">
      {category ? (
        <div className="flexCenter ml-2">
          <Button
            type="button"
            secondary
            className="hover:bg-slate-100/30 p-0 size-11"
          >
            <ChevronLeft
              className="size-full"
              strokeWidth={1}
              onClick={() => onOpen("MOBILESIDEBAR", {})}
            />
          </Button>
          <p className="text-2xl font-bold ml-2">Categories</p>
        </div>
      ) : (
        <p className="text-2xl font-bold ml-5 text-slate-800">{title}</p>
      )}
      <Button
        type="button"
        secondary
        center
        className="bg-gray-100 opacity-50 rounded-full transition hover:opacity-100 size-7 p-0 flexCenter mr-5"
      >
        <X
          onClick={onClose}
          className="cursor-pointer opacity-100 w-full h-full"
          color="black"
        />
      </Button>
    </div>
  );
};