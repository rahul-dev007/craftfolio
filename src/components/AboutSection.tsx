'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaStripe } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiMongodb,
  SiOpenai,
  SiLangchain,
  SiVercel,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiReact,
  SiRedux,
  SiPrisma,
  SiNextdotjs as SiNext,
  SiNodedotjs,
  SiPostman,
  SiFigma,
} from 'react-icons/si';
import { ShieldCheck, Database, FileText, Sparkles } from 'lucide-react';

const pill =
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm bg-gray-800/60 border border-gray-700 text-gray-200';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white relative overflow-hidden"
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          👨‍💻 About <span className="text-indigo-400">Rahul Biswas</span>
        </motion.h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* ===== Right: Text ===== */}
          <motion.div
            className="md:w-2/3 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              I’m a <span className="text-teal-400 font-semibold">Full-Stack Developer</span> from
              <span className="text-teal-400"> Dhaka, Bangladesh</span>, specializing in{' '}
              <span className="text-teal-400">MERN & Next.js</span> with hands-on experience in
              <span className="text-teal-400"> AI integration (LLMs, RAG, Vector Search)</span>. I build
              scalable backends, clean UIs, and smart, data-aware applications.
            </p>

            {/* Highlights (from CV) */}
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start gap-3">
                <Sparkles className="mt-1 text-indigo-300" size={18} />
                <span>
                  Integrated <strong>OpenAI</strong> & <strong>LangChain</strong> to build
                  document-aware chat assistants with <strong>RAG</strong> pipelines.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Database className="mt-1 text-emerald-300" size={18} />
                <span>
                  Designed vector search over <strong>MongoDB Atlas</strong> & built{' '}
                  <code className="text-gray-100 bg-black/30 px-1.5 py-0.5 rounded">/api/ingest</code> ·{' '}
                  <code className="text-gray-100 bg-black/30 px-1.5 py-0.5 rounded">/api/chat</code> for
                  real-time Q&A on personal/enterprise data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-emerald-300" size={18} />
                <span>
                  Implemented auth with <strong>NextAuth.js</strong> and role-based access; deployed
                  production apps on <strong>Vercel</strong>.
                </span>
              </li>
            </ul>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className={pill}><SiReact /> React</span>
              <span className={pill}><SiNextdotjs /> Next.js</span>
              <span className={pill}><SiTailwindcss /> Tailwind</span>
              <span className={pill}><SiTypescript /> TypeScript</span>
              <span className={pill}><SiNodedotjs /> Node.js</span>
              <span className={pill}><SiExpress /> Express</span>
              <span className={pill}><SiMongodb /> MongoDB / Atlas</span>
              <span className={pill}><SiOpenai /> OpenAI API</span>
              <span className={pill}><SiLangchain /> LangChain</span>
              <span className={pill}><Database size={14} /> Vector Search / RAG</span>
              <span className={pill}><SiVercel /> Vercel</span>
              <span className={pill}><FaStripe /> Stripe</span>
              <span className={pill}><SiRedux /> Redux Toolkit</span>
              <span className={pill}><SiPrisma /> Prisma</span>
              <span className={pill}><SiPostman /> Postman</span>
              <span className={pill}><SiFigma /> Figma</span>
            </div>

            {/* Action buttons (Portfolio / E-commerce / GitHub / CV) */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://craftfolio-nine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-95 shadow-lg shadow-indigo-500/30 transition"
              >
                View Portfolio
              </a>
              <a
                href="https://next-js-e-commerce-platform.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:border-indigo-500 transition"
              >
                E-commerce Demo
              </a>
              <a
                href="https://github.com/rahul-dev007"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:border-indigo-500 transition inline-flex items-center gap-2"
              >
                <FaGithub /> GitHub
              </a>
              {/* Optional: host your CV under /public */}
              <a
                href="/Rahul_Biswas_AI_Enhanced_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-semibold bg-gray-800 border border-gray-700 hover:border-indigo-500 transition inline-flex items-center gap-2"
              >
                <FileText size={16} /> Download CV
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Last updated: Oct 26, 2025
            </p>
          </motion.div>

          {/* ===== Left: Image ===== */}
          <motion.div
            className="md:w-1/3 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden group shadow-lg border-4 border-teal-400">
              <Image
                src="/profile.jpg"
                alt="Rahul Profile"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
