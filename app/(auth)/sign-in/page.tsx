// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { APP_NAME } from "@/lib/constants";
// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import CredentialsSignInForm from "./credentials-signin-form";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Sign In",
//   description: "Sign in to your account",
// };

// export const SignInPage = async (props: {
//   searchParams: Promise<{ callbackUrl?: string }>;
// }) => {
//   const { callbackUrl } = await props.searchParams;
//   const session = await auth();
//   if (session) {
//     return redirect(callbackUrl || "/");
//   }
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="space-y-4">
//           <Link href="/" className="flex-center">
//             <Image
//               src="/images/logo.svg"
//               alt={`${APP_NAME} logo`}
//               height={100}
//               width={100}
//               priority={true}
//             ></Image>
//           </Link>
//           <CardTitle className="text-center">Sign In</CardTitle>
//           <CardDescription className="text-center">
//             Sign in with your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <CredentialsSignInForm></CredentialsSignInForm>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // export default SignInPage;
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { APP_NAME } from "@/lib/constants";
// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import CredentialsSignInForm from "./credentials-signin-form";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Sign In",
//   description: "Sign in to your account",
// };

// interface SignInPageProps {
//   searchParams: {
//     callbackUrl?: string;
//   };
// }

// export default async function SignInPage({
//   searchParams,
// }: SignInPageProps): Promise<JSX.Element> {
//   const { callbackUrl } = searchParams;
//   const session = await auth();

//   if (session) {
//     // If a session exists, redirect the user to callbackUrl or home
//     return redirect(callbackUrl || "/");
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="space-y-4">
//           <Link href="/" className="flex-center">
//             <Image
//               src="/images/logo.svg"
//               alt={`${APP_NAME} logo`}
//               height={100}
//               width={100}
//               priority={true}
//             />
//           </Link>
//           <CardTitle className="text-center">Sign In</CardTitle>
//           <CardDescription className="text-center">
//             Sign in with your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <CredentialsSignInForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { APP_NAME } from "@/lib/constants";
// import { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import CredentialsSignInForm from "./credentials-signin-form";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import React from "react";
// export const metadata: Metadata = {
//   title: "Sign In",
//   description: "Sign in to your account",
// };

// // Change the type so that searchParams is a Promise
// interface SignInPageProps {
//   searchParams: Promise<{ callbackUrl?: string }>;
// }

// export default async function SignInPage({
//   searchParams,
// }: SignInPageProps): Promise<JSX.Element> {
//   const { callbackUrl } = await searchParams; // await the promise
//   const session = await auth();

//   if (session) {
//     // If a session exists, redirect the user to the callbackUrl or home
//     return redirect(callbackUrl || "/");
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="space-y-4">
//           <Link href="/" className="flex-center">
//             <Image
//               src="/images/logo.svg"
//               alt={`${APP_NAME} logo`}
//               height={100}
//               width={100}
//               priority={true}
//             />
//           </Link>
//           <CardTitle className="text-center">Sign In</CardTitle>
//           <CardDescription className="text-center">
//             Sign in with your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <CredentialsSignInForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

// Change the type so that searchParams is a Promise
interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams; // await the promise
  const session = await auth();

  if (session) {
    // If a session exists, redirect the user to the callbackUrl or home
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={100}
              width={100}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
