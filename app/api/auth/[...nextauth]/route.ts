import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/db";
import { User } from "@prisma/client";

// Define a custom type for user with rememberMe
type ExtendedUser = User & {
  rememberMe: boolean;
};


let maxAge = 0;
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        mobileNumber: { label: "mobileNumber", type: "tel" },
        password: { label: "password", type: "password" },
        rememberMe: { label: "rememberMe", type: "checkbox" }, // Add rememberMe checkbox
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

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

        maxAge = credentials.rememberMe ? 30 : 60 * 60

        return { ...user, rememberMe: credentials.rememberMe === 'true' };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60
  },
  callbacks: {
    // This manages the session expiration time based on rememberMe
    async session({ session, token, user }) {
      console.log("session: " + session.expires);
      console.log("User: " + user);

        // If rememberMe is true, set session to 30 days, otherwise 1 day
        session.expires = token.exp as string;
        
      return session;
    },

    // This manages the token expiration based on rememberMe
    async jwt({ token, user }) {
      // When the user logs in for the first time, capture the rememberMe status
      console.log("Token: " + token.exp);
      
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.rememberMe = extendedUser.rememberMe;
        // Set JWT expiration dynamically
        const maxAge = token.rememberMe ? 24 * 60 * 60 : 0; // 30 days or 1 day
        token.exp = Math.floor(Date.now() / 1000) + maxAge; // Token expiration in UNIX timestamp
      }


      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };