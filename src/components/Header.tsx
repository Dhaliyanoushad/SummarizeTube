"use client";

import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const UserGreeting = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Loading...</div>;
    const userName =
      user?.username || user?.firstName || user?.lastName || "User";

    return userName;
  };
  return (
    <>
      <header className="fixed w-full bg-[#123458] text-[#F1EFEC] py-4 px-6 shadow-md z-50 ">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-2 flex-1">
            <div className="bg-[#F1EFEC] text-[#123458] rounded-full w-8 h-8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">SummarizeTube</span>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 text">
            <a href="#" className="hover:text-[#D4C9BE] transition-colors">
              Home
            </a>
            <SignedIn>
              <Link href="/dashboard/summarizer">
                <span className="hover:text-[#D4C9BE] transition-colors cursor-pointer">
                  Dashboard
                </span>
              </Link>
            </SignedIn>
            <a
              href="#features"
              className="hover:text-[#D4C9BE] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#D4C9BE] transition-colors"
            >
              How It Works
            </a>
            <a href="#faq" className="hover:text-[#D4C9BE] transition-colors">
              FAQ
            </a>
          </nav>
          <SignedIn>
            <div className="flex items-center space-x-4 flex-1 justify-end ">
              <div className="flex items-center space-x-2">
                <UserButton />
                <span className="text-[#F1EFEC] hidden sm:inline text-xl font-bold drop-shadow-md px-3 py-1 rounded bg-[#123458]/70 ">
                  Welcome, {UserGreeting()}
                </span>{" "}
              </div>
              <SignOutButton>
                <button className="px-4 py-2 bg-[#D4C9BE] text-[#123458] rounded-lg hover:bg-[#F1EFEC] transition-colors cursor-pointer">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center space-x-4 flex-1 justify-end ">
              <SignInButton>
                <button className="px-4 py-2 border border-[#F1EFEC] rounded-lg hover:bg-[#F1EFEC] hover:text-[#123458] transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="px-4 py-2 bg-[#D4C9BE] text-[#123458] rounded-lg hover:bg-[#F1EFEC] transition-colors cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </header>
    </>
  );
}
