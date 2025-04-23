import Link from "next/link";
import React from "react";
import Image from "next/image";

const How = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#030303] mb-16">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#123458] rounded-xl blur opacity-10"></div>
              <div className="relative bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#123458] text-[#F1EFEC] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#030303] mb-1">
                        Paste a YouTube URL
                      </h3>
                      <p className="text-[#030303]/70">
                        Find a video you want to summarize and paste the link.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#123458] text-[#F1EFEC] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#030303] mb-1">
                        Our AI generates a summary
                      </h3>
                      <p className="text-[#030303]/70">
                        The AI analyzes the video content and creates a concise
                        summary.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#123458] text-[#F1EFEC] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#030303] mb-1">
                        Create flashcards
                      </h3>
                      <p className="text-[#030303]/70">
                        Turn key points into flashcards for effective learning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#123458] text-[#F1EFEC] w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#030303] mb-1">
                        Save and access anytime
                      </h3>
                      <p className="text-[#030303]/70">
                        Everything is saved to your account for future
                        reference.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/signup">
                    <span className="inline-block px-6 py-3 bg-[#123458] text-[#F1EFEC] rounded-lg hover:bg-[#123458]/90 transition-colors cursor-pointer">
                      Try It Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[440px] md:w-1/2">
            <Image
              src="https://i.pinimg.com/736x/53/e2/08/53e208c4dd68574c820a2ffd0fd2d657.jpg"
              alt="panda teaching"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;
