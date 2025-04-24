import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section className="py-20 bg-[#D4C9BE]/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#030303] mb-6">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-[#030303]/70 mb-10 max-w-2xl mx-auto">
          Join students who are saving time and learning more effectively with
          SummarizeTube.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignUpButton>
            <button className="px-8 py-4 bg-[#123458] text-[#F1EFEC] rounded-lg hover:bg-[#123458]/90 transition-colors cursor-pointer">
              Get Started For Free
            </button>
          </SignUpButton>
          <Link href="#how-it-works">
            <span className="px-8 py-4 border border-[#123458] text-[#123458] rounded-lg hover:bg-[#123458]/5 transition-colors cursor-pointer">
              Learn More
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
