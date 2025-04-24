"use client";
import Head from "next/head";
// import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import How from "@/components/How";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1EFEC]">
      <Head>
        <title>SummarizeTube - YouTube Summaries & Flashcards</title>
        <meta
          name="description"
          content="Get AI-powered summaries and flashcards from YouTube videos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Features />
        <How />
        <Cta />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
