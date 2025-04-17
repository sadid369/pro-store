"use server";

import { signIn, signOut } from "@/auth";
import { signInFromSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { read } from "fs";

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
export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to sign out",
    };
  }
}
