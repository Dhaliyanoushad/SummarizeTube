import React from "react";

const faqs = [
  {
    question: "How accurate are the summaries?",
    answer:
      "Our summarizer is pretty reliable! It pulls out the most important points from the video and puts them into a clear summary. While it may not catch every small detail—especially in super technical content—it’s designed to give you a solid understanding of the main ideas.",
  },
  {
    question: "Can I summarize videos in languages other than English?",
    answer:
      "No, not yet. Right now we only support English, but we’re working on adding support for more languages soon!",
  },
  {
    question: "How do the flashcards work?",
    answer:
      "Instead of traditional question-and-answer flashcards, our system creates 10 visual cards based on your video’s summary. These give you bite-sized insights to help you review and remember the key takeaways more easily.",
  },
  {
    question: "Can I export my summaries and flashcards?",
    answer:
      "Yes! You can print your summaries and flashcards as PDFs and save them directly to your computer.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#030303] mb-16">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {" "}
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-[#030303] mb-2">
                {faq.question}
              </h3>
              <p className="text-[#030303]/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
