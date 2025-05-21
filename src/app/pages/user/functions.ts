"use server";

import { auth } from "@/app/lib/auth";
// Import RedwoodSDK auth utilities as needed
// import { db } from "@/db";
// import * as schema from "@/db/auth-schema";
import { authClient } from "@/app/lib/auth-client";

export type LoginResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export type RegisterResult = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function loginWithEmail(formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    // Your RedwoodSDK auth logic here
    // For example:
    await auth.api.signInEmail({ body: { email, password } });

    // Success case - in a real implementation, you'd create a session here
    return { success: true, message: "Login successful" };

    // Optional: Use Next.js redirect
    // redirect('/dashboard');
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function registerWithEmail(formData: FormData): Promise<RegisterResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log("name", name);
  console.log("email", email);
  console.log("password", password);

  try {
    await auth.api.signUpEmail({ body: { name, email, password } });
    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Registration failed" };
  }
}




// old passkey functions
// import {
//   AuthenticationResponseJSON,
//   generateAuthenticationOptions,
//   generateRegistrationOptions,
//   RegistrationResponseJSON,
//   verifyAuthenticationResponse,
//   verifyRegistrationResponse,
// } from "@simplewebauthn/server";

// import { db } from "@/db";
// import * as schema from "@/db/auth-schema";
// import { sessions } from "@/session/store";
// import { env } from "cloudflare:workers";
// import { eq } from "drizzle-orm";
// import { requestInfo } from "rwsdk/worker";

// const IS_DEV = process.env.NODE_ENV === "development";

// function getWebAuthnConfig(request: Request) {
//   const rpID = env.WEBAUTHN_RP_ID ?? new URL(request.url).hostname;
//   const rpName = IS_DEV ? "Development App" : env.WEBAUTHN_APP_NAME;
//   return {
//     rpName,
//     rpID,
//   };
// }

// export async function startPasskeyRegistration(username: string) {
//   const { rpName, rpID } = getWebAuthnConfig(requestInfo.request);
//   const { headers } = requestInfo;

//   const options = await generateRegistrationOptions({
//     rpName,
//     rpID,
//     userName: username,
//     authenticatorSelection: {
//       // Require the authenticator to store the credential, enabling a username-less login experience
//       residentKey: "required",
//       // Prefer user verification (biometric, PIN, etc.), but allow authentication even if it's not available
//       userVerification: "preferred",
//     },
//   });

//   await sessions.save(headers, { challenge: options.challenge });

//   return options;
// }

// export async function startPasskeyLogin() {
//   const { rpID } = getWebAuthnConfig(requestInfo.request);
//   const { headers } = requestInfo;

//   const options = await generateAuthenticationOptions({
//     rpID,
//     userVerification: "preferred",
//     allowCredentials: [],
//   });

//   await sessions.save(headers, { challenge: options.challenge });

//   return options;
// }

// export async function finishPasskeyRegistration(
//   username: string,
//   registration: RegistrationResponseJSON,
// ) {
//   const { request, headers } = requestInfo;
//   const { origin } = new URL(request.url);

//   const session = await sessions.load(request);
//   const challenge = session?.challenge;

//   if (!challenge) {
//     return false;
//   }

//   const verification = await verifyRegistrationResponse({
//     response: registration,
//     expectedChallenge: challenge,
//     expectedOrigin: origin,
//     expectedRPID: env.WEBAUTHN_RP_ID || new URL(request.url).hostname,
//   });

//   if (!verification.verified || !verification.registrationInfo) {
//     return false;
//   }

//   await sessions.save(headers, { challenge: null });

//   // Generate a unique ID for the user
//   const userId = crypto.randomUUID();

//   // Create a new user
//   await db.insert(schema.users).values({
//     id: userId,
//     username,
//   });

//   // Create the credential
//   await db.insert(schema.credentials).values({
//     id: crypto.randomUUID(),
//     userId: userId,
//     credentialId: verification.registrationInfo.credential.id,
//     publicKey: verification.registrationInfo.credential.publicKey,
//     counter: verification.registrationInfo.credential.counter,
//   });

//   return true;
// }

// export async function finishPasskeyLogin(login: AuthenticationResponseJSON) {
//   const { request, headers } = requestInfo;
//   const { origin } = new URL(request.url);

//   const session = await sessions.load(request);
//   const challenge = session?.challenge;

//   if (!challenge) {
//     return false;
//   }

//   const credentials = await db
//     .select()
//     .from(schema.credentials)
//     .where(eq(schema.credentials.credentialId, login.id))
//     .limit(1);

//   const credential = credentials[0];

//   if (!credential) {
//     return false;
//   }

//   const verification = await verifyAuthenticationResponse({
//     response: login,
//     expectedChallenge: challenge,
//     expectedOrigin: origin,
//     expectedRPID: env.WEBAUTHN_RP_ID || new URL(request.url).hostname,
//     requireUserVerification: false,
//     credential: {
//       id: credential.credentialId,
//       publicKey: credential.publicKey,
//       counter: credential.counter,
//     },
//   });

//   if (!verification.verified) {
//     return false;
//   }

//   await db
//     .update(schema.credentials)
//     .set({
//       counter: verification.authenticationInfo.newCounter,
//     })
//     .where(eq(schema.credentials.credentialId, login.id));

//   const users = await db
//     .select()
//     .from(schema.users)
//     .where(eq(schema.users.id, credential.userId))
//     .limit(1);

//   const user = users[0];

//   if (!user) {
//     return false;
//   }

//   await sessions.save(headers, {
//     userId: user.id,
//     challenge: null,
//   });

//   return true;
// }
