"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#123458]">
      <div className="p-8 rounded-2xl shadow-lg bg-[#D4C9BE] w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#123458] text-center mb-4">
          Welcome back
        </h1>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-[#123458] hover:bg-[#030303] text-white rounded-lg",
              card: "bg-[#F1EFEC] border-none shadow-none",
              headerTitle: "text-[#123458]",
              footerActionLink: "text-[#123458] underline",
            },
          }}
        />
      </div>
    </div>
  );
}
