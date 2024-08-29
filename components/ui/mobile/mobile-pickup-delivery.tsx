import React from "react";
import { MobilePickupDeliveryItem } from "./mobile-pickup-delivery-item";

type MobilePickupDeliveryProps = {
  links: {
    href: string;
    imageURL?: string;
  }[];
};

export const MobilePickupDelivery = ({ links }: MobilePickupDeliveryProps) => {
  return (
    <div className="">
      {links.map((link) => (
        <MobilePickupDeliveryItem key={link.href} />
      ))}
    </div>
  );
};
