import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/db";
import { User } from "@prisma/client";
import { formatPhoneNumber } from "@/lib/format-phone-number";
import { emailRegex } from "@/lib/constants";

// Define a custom type for user with rememberMe
type ExtendedUser = User & {
  rememberMe: boolean;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        rememberMe: { label: "rememberMe", type: "checkbox" }, // Add rememberMe checkbox
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        const formattedUsername = formatPhoneNumber(credentials?.email);
        if (formattedUsername !== "") {
          if (!emailRegex.test(credentials?.email)) {
            throw new Error("Invalid Credentials");
          }
        }
        let user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          user = await prismadb.user.findUnique({
            where: {
              mobileNumber: credentials.email,
            },
          });
        }

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return { ...user, rememberMe: credentials.rememberMe === "true" };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // This manages the session expiration time based on rememberMe
    async session({ session, token, user }) {
      // If rememberMe is true, set session to 30 days, otherwise 1 day
      session.expires = token.exp as string;

      return session;
    },

    // This manages the token expiration based on rememberMe
    async jwt({ token, user }) {
      // When the user logs in for the first time, capture the rememberMe status

      if (user) {
        const extendedUser = user as ExtendedUser;
        token.rememberMe = extendedUser.rememberMe;
        // Set JWT expiration dynamically
        const maxAge = token.rememberMe ? 30 * 24 * 60 * 60 : 60 * 60; // 30 days or 1 day
        token.exp = Math.floor(Date.now() / 1000) + maxAge; // Token expiration in UNIX timestamp
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
