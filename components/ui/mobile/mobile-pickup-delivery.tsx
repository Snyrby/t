import { MobilePickupDeliveryItem } from "./mobile-pickup-delivery-item";

type MobilePickupDeliveryProps = {
  links: {
    href: string;
    imageURL: string;
    title: string;
    mobileText: string;
  }[];
};

export const MobilePickupDelivery = ({ links }: MobilePickupDeliveryProps) => {
  return (
    <div className="flexBetween gap-x-4 my-4">
      {links.map((link) => (
        <MobilePickupDeliveryItem
          key={link.title}
          href={link.href}
          title={link.title}
          imageURL={link.imageURL}
          mobileText={link.mobileText}
        />
      ))}
    </div>
  );
};
