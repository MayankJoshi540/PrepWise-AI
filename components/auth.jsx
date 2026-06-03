import { SignIn, SignUp } from "@clerk/nextjs";

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
      signInUrl="/sign-in"
      fallbackRedirectUrl="/"
      {...props}
    />
  );
}
