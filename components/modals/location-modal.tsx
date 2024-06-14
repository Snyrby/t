import { useModal } from "@/hooks/use-modal-store";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type LocationFormProps = {
  zipCode: number;
};

export const LocationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const { register, handleSubmit, setValue, getValues, formState } =
    useForm<LocationFormProps>();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (type !== "LOCATION" || isOpen === false) {
    return null;
  }

  const isLoading = formState.isSubmitting;

  const onSubmit = async (data: LocationFormProps) => {
    // await fetch("http://ip-api.com/json")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     return console.log(data);
    //   });
    console.log(data);
  };
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 h-full bg-white w-96 shadow-lg transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          <div className="flex my-3 justify-between items-center mx-5">
            <p className="text-xl font-bold">Update shipping location</p>
            <div className="bg-gray-100 opacity-50 rounded-full transition hover:opacity-100 size-7 flex justify-center items-center">
              <X
                onClick={() => onClose()}
                className="cursor-pointer opacity-100"
                size={28}
                color="black"
              />
            </div>
          </div>
          <div className="border mx-0" />
          <div className="flex flex-col justify-between h-full mx-4">
            <div className="">
            <p className="text-sm my-4">
              Item availability and shipping options will change based on
              location.
            </p>
            <form
              className="relative"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label
                htmlFor="zipCode"
                className={clsx(
                  "absolute -top-2 left-3 bg-white text-xs z-10",
                  formState.errors.zipCode?.message &&
                    "text-red-600 bg-amber-100"
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
                className={clsx(
                  "p-[10px] border-[1px] border-[rgb(136, 136, 136)] rounded-sm w-full outline-none focus:bg-white focus:border-[2px]",
                  formState.errors.zipCode?.message &&
                    "border-red-600 bg-amber-100 focus:bg-amber-100"
                )}
                disabled={isLoading}
              />
            </form>
            <p className="text-xs text-red-600">
              {formState.errors.zipCode?.message}
            </p>
          </div>
          <div className="">
            button
          </div>
          </div>
        </div>
      </aside>
      <button
        className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30"
        onClick={() => onClose()}
      />
    </>
  );
};
