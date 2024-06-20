import { useModal } from "@/hooks/use-modal-store";
import clsx from "clsx";
import { X, MapPin } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { setLocationCookie } from "@/lib/set-location-cookie";


type LocationFormProps = {
  zipCode: number;
};

export const LocationModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const { register, handleSubmit, formState } = useForm<LocationFormProps>();

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
    try {
      setLocationCookie(data.zipCode);
      // Simulate an async operation with delay
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      console.log("Data submitted:", data);
    } catch (error) {
      console.log("Location Modal Submit Error:", error);
    } finally {
      console.log("Loading state set to false");
    }
  };

  // await fetch("http://ip-api.com/json")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     return console.log(data);
  //   });
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 h-full bg-white w-[30rem] shadow-lg transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          <div className="flex my-3 justify-between items-center border-b h-16">
            <p className="text-2xl font-bold ml-5">Update shipping location</p>
            <div className="bg-gray-100 opacity-50 rounded-full transition hover:opacity-100 size-7 flexCenter mr-5">
              <X
                onClick={() => onClose()}
                className="cursor-pointer opacity-100"
                size={28}
                color="black"
              />
            </div>
          </div>
          <form className="h-full flex flex-col justify-between mx-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex justify-start gap-y-4 items-center flex-col">
                <p className="text-sm my-2">
                  Item availability and shipping options will change based on
                  location.
                </p>
                <div className="w-full relative">
                  <label
                    htmlFor="zipCode"
                    className={clsx(
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
                    className={clsx(
                      "p-[10px] border-[1px] border-[rgb(136, 136, 136)] rounded-sm w-full outline-none focus:bg-white focus:border-[2px]",
                      formState.errors.zipCode?.message &&
                        "border-red-600 bg-amber-100 focus:bg-amber-100"
                    )}
                    disabled={formState.isSubmitting}
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
                >
                  {/* w-full flex items-center justify-start gap-x-2 cursor-pointer pl-6 focus-visible: */}
                  <MapPin size={26} color="red" strokeWidth={2} />
                  <p className="underline text-base text-gray-600">
                    Use my current location
                  </p>
                </Button>
              </div>
            <div className="border-t flex items-center justify-center h-20">
              <Button
                type="submit"
                fullWidth={true}
                danger={false}
                disabled={isLoading}
                center
                className="mx-4 h-12 text-xl"
              >
                {isLoading ? "Updating" : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </aside>
      <button
        className="bg-black fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30"
        onClick={() => onClose()}
      />
    </>
  );
};
