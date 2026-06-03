import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RouteSignUp } from "@/components/auth";
import { Badge } from "@/components/ui/badge";

export default function SignUpPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.12),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <section className="hidden space-y-5 lg:block">
          <Badge variant="outline" className="rounded-full px-3 py-1 uppercase tracking-[0.22em]">
            First account
          </Badge>
          <h1
            className="max-w-xl text-5xl leading-none font-medium tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}>
            Create your PrepWise account and get moving.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-muted-foreground">
            Sign up here to create the first test user for this project, then Clerk
            will hand you straight back to the app.
          </p>
        </section>

        <section className="flex w-full justify-center">
          <div className="w-full max-w-md space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
            <RouteSignUp />
          </div>
        </section>
      </div>
    </div>
  );
}
