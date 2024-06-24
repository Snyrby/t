"use client"

type NavigationLink = {
  text: string;
};

const NavigationLink = ({ text }: NavigationLink) => {
  return <div>{text}</div>;
};

export default NavigationLink;
