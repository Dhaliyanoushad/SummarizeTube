import SummaryForm from "@/components/SummaryForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-black p-0">
      <div className="w-full max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-semibold mb-6 text-white text-center tracking-tight">
          YouTube AI <span className="text-blue-400">Summary</span>
        </h1>
        <p className="text-xl text-blue-200 text-center mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          Transform lengthy video transcripts into concise summaries with the
          power of AI.
        </p>
        <SummaryForm />
        <div className="mt-20 text-center">
          <p className="text-sm text-blue-300 opacity-70">
            Designed to help you study smarter, not harder.
          </p>
        </div>
      </div>
    </main>
  );
}
