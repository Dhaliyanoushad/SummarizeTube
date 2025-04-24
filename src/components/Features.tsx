import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-[#D4C9BE]/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#030303] mb-16">
          Everything You Need to Learn Efficiently
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-[#123458] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F1EFEC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#030303] mb-3">
              Concise Summaries
            </h3>
            <p className="text-[#030303]/70">
              Get the key points from any YouTube video, without watching the
              whole thing. Save hours of your time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-[#123458] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F1EFEC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#030303] mb-3">
              Smart Flashcards
            </h3>
            <p className="text-[#030303]/70">
              AI-generated flashcards help you memorize key concepts and test
              your knowledge for better retention.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-[#123458] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F1EFEC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#030303] mb-3">
              Save & Organize
            </h3>
            <p className="text-[#030303]/70">
              Create your personal knowledge base by saving summaries and
              flashcards for future reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
