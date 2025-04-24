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
          {/* Left - Brand Logo */}
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

          {/* Center - Navigation Links */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link href="/">
              <span className="hover:text-[#D4C9BE] transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/dashboard/summarizer">
              <span className="hover:text-[#D4C9BE] transition-colors cursor-pointer">
                Dashboard
              </span>
            </Link>
            {/* <Link href="/summaries">
                <span className="hover:text-[#D4C9BE] transition-colors cursor-pointer">
                  Summaries
                </span>
              </Link> */}
          </nav>

          {/* Right - User Profile Section */}
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
        </div>
      </header>
    </>
  );
}
