"use server"
import { cookies } from "next/headers"

export const setLocationCookie = (zipCode: number) => {
    const cookieValue = `${zipCode}|39.537|-119.749|NV|US`;
console.log(cookieValue); // This should show the pipes as "|"
cookies().set("UserLocation", cookieValue, {
    httpOnly: true,
    value: cookieValue
});
}