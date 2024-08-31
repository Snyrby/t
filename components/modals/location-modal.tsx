"use client";
import { useModal } from "@/hooks/use-modal-store";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { retrieveLocation, setLocationCookie } from "@/lib/set-location-cookie";
import { cn } from "@/lib/utils";
import { ModalHeader } from "./modal-header";
import { ModalLayout } from "./modal-layout";

type LocationFormProps = {
  zipCode: string;
  onCloseClick: () => void;
};

export const LocationModal = ({ onCloseClick }: LocationFormProps) => {
  const { isOpen, onClose, type, data } = useModal();
  const { register, handleSubmit, formState, setValue } =
    useForm<LocationFormProps>();

  useEffect(() => {
    if (data.zipCode) {
      setValue("zipCode", data.zipCode);
    }
  }, [data]);

  if (type !== "LOCATION" || isOpen === false) {
    document.body.style.overflow = "scroll";
    return null;
  } else {
    document.body.style.overflow = "hidden";
  }

  const isLoading = formState.isSubmitting;

  const onSubmit = async (data: LocationFormProps) => {
    try {
      setLocationCookie(data.zipCode);
      onCloseClick();

      console.log("Data submitted:", data);
    } catch (error) {
      console.log("Location Modal Submit Error:", error);
    } finally {
      console.log("Loading state set to false");
    }
  };

  const onUseLocation = () => {
    retrieveLocation();
    onClose();
  };

  return (
    <ModalLayout>
      <ModalHeader title="Update shipping location" onClose={onCloseClick} />
      <form
        className="h-full flex flex-col justify-between mx-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flexStart gap-y-4 flex-col">
          <p className="text-sm my-2">
            Item availability and shipping options will change based on
            location.
          </p>
          <div className="w-full relative">
            <label
              htmlFor="zipCode"
              className={cn(
                "absolute -top-2 left-3 text-xs z-10",
                formState.errors.zipCode?.message
                  ? "text-red-600 bg-amber-100"
                  : "text-black bg-white"
              )}
            >
              Zip code
            </label>
            <input
              type="text"
              id="zipCode"
              {...register("zipCode", {
                required: {
                  value: true,
                  message: "Zipcode is required",
                },
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Invalid zipcode",
                },
              })}
              className={cn(
                "p-[10px] border-[1px] border-[rgb(136, 136, 136)] rounded-sm w-full outline-none focus:bg-white focus:border-[2px]",
                formState.errors.zipCode?.message &&
                  "border-red-600 bg-amber-100 focus:bg-amber-100"
              )}
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-red-600 w-full">
            {formState.errors.zipCode?.message}
          </p>
          <Button
            secondary
            type="button"
            className="gap-x-2 pl-6"
            fullWidth
            start
            disabled={isLoading}
            onClick={onUseLocation}
          >
            <MapPin size={26} color="red" strokeWidth={2} />
            <p className="underline text-base text-gray-500">
              Use my current location
            </p>
          </Button>
        </div>
        <div className="border-t flexCenter h-20">
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            center
            className="h-12 text-xl rounded-full focus:underline"
          >
            {isLoading ? "Updating" : "Update"}
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};
