import Image from "next/image";
import Link from "next/link";

type MobilePickupDeliveryItemProps = {
  href: string;
  imageURL: string;
  title: string;
  mobileText: string;
};

export const MobilePickupDeliveryItem = ({
  href,
  imageURL,
  title,
  mobileText,
}: MobilePickupDeliveryItemProps) => {
  return (
    <Link
      className="flexBetween bg-gray-300/30 rounded-lg px-2 py-2 focus-visible:outline-dotted focus-visible:outline-2 focus-visible:outline-slate-500"
      href={href}
    >
      <Image
        alt={title}
        src={imageURL}
        width={27}
        height={27}
        className="mr-2"
      />
      <div className="flex items-start justify-start flex-col">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-gray-600">{mobileText}</p>
      </div>
    </Link>
  );
};
