import bcrypt from "bcrypt";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, password, mobileNumber } =
      await request.json();

    if (!email || !firstName || !lastName || !password) {
      return new NextResponse("Please provide all info", { status: 400 });
    }

    const isEmailUsed = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailUsed) {
      return new NextResponse("That email is already in use", { status: 400 });
    }

    const isMobileNumberUsed = await prismadb.user.findUnique({
      where: {
        mobileNumber,
      },
    });

    if (isMobileNumberUsed) {
        return new NextResponse("That mobile number is already in use", { status: 400 });
      }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const user = await prismadb.user.create({
      data: {
        email,
        firstName,
        lastName,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.log("[REGISTRATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
