'use client';

import { SignIn, SignUp, useAuth } from "@clerk/nextjs";

/**
 * SHOW COMPONENT
 * A versatile wrapper for Clerk authentication states.
 * Supports: 'loading', 'signed-in', 'signed-out'
 */
export function Show({ when, children }) {
  const { isLoaded, userId } = useAuth();

  if (when === "loading") {
    return !isLoaded ? children : null;
  }

  // If we are checking for auth states, we should wait until isLoaded is true
  // to avoid flickers or incorrect states.
  if (!isLoaded) return null;

  const isSignedIn = !!userId;

  if (when === "signed-in") {
    return isSignedIn ? children : null;
  }

  if (when === "signed-out") {
    return !isSignedIn ? children : null;
  }

  return null;
}

export function EmbeddedSignIn(props) {
  return (
    <SignIn
      routing="hash"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/"
      {...props}
    />
  );
}

export function EmbeddedSignUp(props) {
  return (
    <SignUp
      routing="hash"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/"
      {...props}
    />
  );
}

export function RouteSignIn(props) {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/"
      {...props}
    />
  );
}

export function RouteSignUp(props) {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-up"
      fallbackRedirectUrl="/"
      {...props}
    />
  );
}
