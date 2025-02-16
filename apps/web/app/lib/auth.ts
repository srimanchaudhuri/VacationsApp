import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import { SignInValidation } from "@repo/zod/schema";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "jhondoe@example.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "***********",
          type: "text",
        },
      },
      async authorize(credentials: any) {
        const signInBody = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const response = SignInValidation.safeParse(signInBody);
          if (!response.success) {
            return Promise.reject(new Error("Invalid Inputs"));
          }
          const existingUser = await prisma.user.findUnique({
            where: {
              email: response.data.email,
            },
          });
          if (!existingUser) {
            return Promise.reject(new Error("User does not exist"));
          }

          const hashedPassword = existingUser.password;
          const passwordValidation = await bcrypt.compare(
            response.data.password,
            hashedPassword
          );

          if (!passwordValidation) {
            return Promise.reject(new Error("Wrong Password"));
          }

          return {
            id: existingUser.id.toString(),
            name: existingUser.firstName + " " + existingUser.lastName,
            email: existingUser.email,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  pages: {
    signIn: "/pages/signin",
  },
  callbacks: {
    async signIn({ user }: any) {
      if (user) {
        return true;
      } else {
        return `/pages/signin?error=Invalid credentials`;
      }
    },
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
