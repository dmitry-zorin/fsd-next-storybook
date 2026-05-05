"use client";

import { useState } from "react";

import { LoginForm, type LoginCredentials } from "@/features/auth";

export default function Home() {
  const [lastLoginEmail, setLastLoginEmail] = useState<string | null>(null);

  const handleSubmit = async (credentials: LoginCredentials) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLastLoginEmail(credentials.email);
  };

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-zinc-100 px-6 py-12 font-sans">
      <section className="grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_400px] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            FSD Storybook
          </p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold text-zinc-950 sm:text-5xl">
              Auth UI built as a feature slice.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              The app route composes the public auth feature API, while
              Storybook captures the form states and interaction tests.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm">
            {lastLoginEmail ? (
              <p>
                Last submitted email:{" "}
                <span className="font-medium text-zinc-950">
                  {lastLoginEmail}
                </span>
              </p>
            ) : (
              <p>No login attempt submitted yet.</p>
            )}
          </div>
        </div>

        <LoginForm
          initialEmail="demo@example.com"
          onSubmit={handleSubmit}
          submitLabel="Continue"
        />
      </section>
    </main>
  );
}
