import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "./generated/prisma/runtime/library";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// formate error
//disable comment for nextjs eslint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    // handle zod error
    const fieldErrors = Object.keys(error.errors).map((fields) => {
      return error.errors[fields].message;
    });
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" ||
    error.name === "P2002"
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field} already exists.`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error);
  }
}
