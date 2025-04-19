"use server";

import { signIn, signOut } from "@/auth";
import { signInFromSchema, signUpFromSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { PrismaClient } from "../generated/prisma";
import { formatError } from "../utils";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  fromData: FormData
) {
  try {
    const user = signInFromSchema.parse({
      email: fromData.get("email"),
      password: fromData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// SignOut the user

export async function signOutUser(formData: FormData) {
  try {
    await signOut();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // Re-throw redirect errors to allow Next.js to handle them
    }
    console.error("Sign out failed:", error);
  }
}

// signUp User

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const prisma = new PrismaClient();
    const user = signUpFromSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    const existingUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    if (existingUser) {
      await signIn("credentials", {
        email: user.email,
        password: plainPassword,
      });
    }
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: formatError(error),
    };
  }
}
