"use server";
import { cookies } from "next/headers";

export const setLocationCookie = (zipCode: string) => {
  const cookieValue = `${zipCode}|39.537|-119.749|NV|US`;
  cookies().set("UserLocation", cookieValue, {
    httpOnly: true,
    value: cookieValue,
    secure: false,
  });
};

export const retrieveLocation = async () => {
  await fetch("http://ip-api.com/json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cookieValue = `${data.zip}|${data.lat}|${data.lon}|${data.region}|${data.countryCode}`;
      cookies().set("UserLocation", cookieValue, {
        httpOnly: true,
        value: cookieValue,
        secure: false,
      });
    });
};