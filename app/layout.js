import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PrepWise AI",
  description: "PrepWise AI with Clerk authentication.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="antialiased"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ClerkProvider
          appearance={{ theme: shadcn }}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
        >
          <Header />
          <main className="min-h-dvh">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
