import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed w-full bg-[#123458] text-[#F1EFEC] py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
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

        <nav className="hidden md:flex items-center space-x-8">
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
          <a href="#pricing" className="hover:text-[#D4C9BE] transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <SignedOut>
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
          </SignedOut>

          <SignedIn>
            <UserButton showName />
            <SignOutButton>
              <button className="px-4 py-2 bg-[#D4C9BE] text-[#123458] rounded-lg hover:bg-[#F1EFEC] transition-colors cursor-pointer">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
