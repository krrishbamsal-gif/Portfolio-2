'use client';

import { motion } from 'framer-motion';
import ParticleAssembleImage from './ParticleAssembleImage';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const tagline = 'BUILDING DIGITAL EXPERIENCES WITH CODE';

const taglineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.4 },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* ---- Content wrapper ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* ---- Particle Assemble Portrait (Clean Cutout, No Background) ---- */}
        <motion.div variants={fadeUp} className="mb-4 flex justify-center">
          <ParticleAssembleImage
            imageSrc="/images/krrish-cutout.png"
            width={190}
            height={250}
          />
        </motion.div>

        {/* ---- Animated Tagline ---- */}
        <motion.p
          variants={taglineContainer}
          initial="hidden"
          animate="visible"
          className="mb-3 flex flex-wrap justify-center gap-[2px] text-xs font-semibold uppercase tracking-[0.3em] text-[#00f0ff] sm:text-sm"
        >
          {tagline.split('').map((ch, i) => (
            <motion.span key={i} variants={charVariant}>
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </motion.p>

        {/* ---- Main heading with Full Name KRRISH BANSAL ---- */}
        <motion.div variants={fadeUp}>
          <p className="text-lg font-light text-gray-400 sm:text-xl tracking-wide">
            Hi, I&apos;m
          </p>
          <h1 className="mt-1 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">
            <span
              className="text-[#00f0ff]"
              style={{
                textShadow:
                  '0 0 20px rgba(0,240,255,0.7), 0 0 60px rgba(0,240,255,0.35), 0 0 100px rgba(168,85,247,0.2)',
              }}
            >
              KRRISH
            </span>
            <span
              className="text-white"
              style={{
                textShadow:
                  '0 0 20px rgba(255,255,255,0.6), 0 0 60px rgba(168,85,247,0.4)',
              }}
            >
              BANSAL
            </span>
          </h1>
        </motion.div>

        {/* ---- Subtitle / Role ---- */}
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-base font-normal text-gray-300 sm:text-lg leading-relaxed"
        >
          Aspiring Software Developer &nbsp;|&nbsp; Web Developer &nbsp;|&nbsp; AI &amp; Technology Enthusiast
        </motion.p>

        {/* ---- Location & University Pill ---- */}
        <motion.div
          variants={fadeUp}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-400 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
          <span>BCA Student &bull; Amity University Rajasthan, Jaipur</span>
        </motion.div>

        {/* ---- CTA Buttons & Profiles ---- */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Explore Projects Button */}
          <button
            onClick={() => scrollTo('projects')}
            className="group relative overflow-hidden rounded-full bg-[#00f0ff] px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              Explore Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {/* Contact Me Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="group relative overflow-hidden rounded-full border-2 border-[#00f0ff] px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#00f0ff] transition-all duration-300 hover:bg-[#00f0ff]/10 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-105"
          >
            <span className="relative">Contact Me</span>
          </button>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/krrish-bansal-24b5aa37b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] hover:scale-105"
            aria-label="Krrish Bansal LinkedIn Profile"
          >
            <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          {/* GitHub Profile Button */}
          <a
            href="https://github.com/krrishbamsal-gif"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
            aria-label="Krrish GitHub Profile"
          >
            <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ---- Scroll-down indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-1 text-gray-500 transition-colors duration-300 hover:text-[#00f0ff]"
        >
          <span className="text-[10px] tracking-widest uppercase text-gray-500">Scroll</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
