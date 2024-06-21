"use server";
import { cookies } from "next/headers";

export const useLocationCookie = async () => {
    const cookie = cookies().get("UserLocation")
    const zipCode = cookie?.value.split("|")[0]
    console.log(zipCode);
  };