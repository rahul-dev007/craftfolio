'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';

// ✅ Brand-safe, always-available icons
import { Database, Cloud, FileText, Globe, Lock, Bolt } from 'lucide-react';
import { SiNextdotjs, SiOpenai, SiVercel, SiSupabase } from 'react-icons/si';
import { FaServer } from 'react-icons/fa6';

const badge =
  'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-200';
const pill =
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-800/60 border border-gray-700 text-gray-200';
const glow = 'absolute -z-10 rounded-full blur-3xl opacity-30';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative bg-gray-950 text-white min-h-screen flex items-center pt-28 md:pt-24 mb-10 overflow-hidden"
    >
      {/* Background glows */}
      <div className={`${glow} w-80 h-80 top-10 -left-16 bg-indigo-600/40 animate-pulse`} />
      <div className={`${glow} w-96 h-96 -bottom-24 -right-24 bg-fuchsia-600/30 animate-ping`} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_500px_at_10%_0%,rgba(79,70,229,0.12),transparent)]" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* ===== Left: Content ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-left space-y-6"
          >
            {/* Top badges */}
            <div className="flex flex-wrap gap-3">
              <span className={badge}>
                <Bolt className="text-yellow-300" size={16} />
                LLM · RAG · Multi-Source Chat
              </span>
              <span className={badge}>
                <Lock className="text-emerald-400" size={16} />
                Secure by design
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400">
                AI-powered
              </span>{' '}
              Assistants
              <br />
              for PDFs, Websites & Databases
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-gray-300">
              <Typewriter
                words={[
                  'MERN & Next.js Developer',
                  'LLM Integrator (OpenAI Compatible)',
                  'Chat with PDF / Web / DB Data',
                  'Clean UI • Fast • Maintainable',
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1400}
              />
            </h2>

            <p className="text-gray-400 max-w-xl">
              Upload PDFs, point to websites, or connect your databases—ask anything and get
              accurate, grounded answers via{' '}
              <strong className="text-gray-200">RAG (Retrieve-Augment-Generate)</strong>. Clean UI,
              secure APIs, and Vercel-ready deployment.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              <span className={pill}>
                <FileText size={16} className="text-indigo-300" /> PDFs & Documents
              </span>
              <span className={pill}>
                <Globe size={16} className="text-sky-300" /> Website Content
              </span>
              <span className={pill}>
                <Database size={16} className="text-emerald-300" /> DB / Collections (e.g. Supabase)
              </span>
              <span className={pill}>
                <Cloud size={16} className="text-gray-200" /> Vercel Functions
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#upload"
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-95 shadow-lg shadow-indigo-500/30 transition"
                aria-label="Try the demo"
              >
                Try the Demo
              </Link>
              <Link
                href="#chat"
                className="px-6 py-3 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:border-indigo-500 transition"
                aria-label="Open chat section"
              >
                Chat with your Data
              </Link>
              <div className="flex items-center gap-3 text-gray-400 text-sm pl-1">
                <SiNextdotjs className="text-white" />
                <SiOpenai className="text-emerald-300" />
                <SiVercel className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* ===== Right: Visual Card ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Floating multi-source RAG card */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live demo
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <SiSupabase />
                    <FaServer />
                    <SiVercel />
                  </div>
                </div>

                <div className="rounded-xl border border-gray-800 bg-black/40 p-4 space-y-4">
                  {/* Source tabs (static preview) */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-md bg-indigo-600/20 border border-indigo-600/30 text-indigo-200 inline-flex items-center gap-1">
                      <FileText size={14} /> PDF
                    </span>
                    <span className="px-2 py-1 rounded-md bg-sky-600/20 border border-sky-600/30 text-sky-200 inline-flex items-center gap-1">
                      <Globe size={14} /> Web
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-600/20 border border-emerald-600/30 text-emerald-200 inline-flex items-center gap-1">
                      <Database size={14} /> DB
                    </span>
                  </div>

                  {/* Upload / URL / DB connect previews */}
                  <div className="grid grid-cols-1 gap-2">
                    <div className="h-10 rounded-md border border-dashed border-gray-700 bg-gray-800/40 flex items-center px-3 text-sm text-gray-400">
                      Drop your <span className="mx-1 text-indigo-300">PDF</span> here…
                    </div>
                    <input
                      readOnly
                      value="https://example.com/docs/policies"
                      className="h-10 rounded-md bg-gray-900/60 border border-gray-800 px-3 text-sm text-gray-300"
                    />
                    <input
                      readOnly
                      value="DB: supabase://project/knowledge_chunks"
                      className="h-10 rounded-md bg-gray-900/60 border border-gray-800 px-3 text-sm text-gray-300"
                    />
                  </div>

                  {/* Chat preview */}
                  <div className="space-y-2">
                    <div className="rounded-md bg-gray-800/60 px-3 py-2 text-sm">
                      Summarize section 3 across all sources.
                    </div>
                    <div className="rounded-md bg-indigo-600/20 border border-indigo-600/30 px-3 py-2 text-sm">
                      Section 3 covers access control; matching policies found in PDF p.12 and Web
                      doc §3.2. DB notes confirm… <span className="text-indigo-300">[p.12, §3.2]</span>
                    </div>
                  </div>

                  {/* Input row */}
                  <div className="mt-2 flex gap-2">
                    <input
                      readOnly
                      value="Ask anything about your PDFs, websites, or DB…"
                      className="flex-1 bg-gray-900/60 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300"
                    />
                    <button className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold">
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional profile bubble */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -left-8 -bottom-8 hidden md:block"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg">
                  <img src="/profile1.jpg" alt="Rahul" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust row / quick facts */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-300">Next.js 14</p>
            <p className="text-gray-400 text-sm">App Router · API Routes</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-300">RAG</p>
            <p className="text-gray-400 text-sm">Chunk · Embed · Retrieve</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-300">Multi-Source</p>
            <p className="text-gray-400 text-sm">PDF · Web · DB</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-300">Deployed</p>
            <p className="text-gray-400 text-sm">Vercel · Prod-ready</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
