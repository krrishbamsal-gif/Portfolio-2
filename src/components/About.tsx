'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * About Section Component
 * ─────────────────────────────────────────────────────────────
 * Transparent background so the 3D particle constellation & vortex
 * animation shines right through across the entire section.
 * Enhanced with vibrant neon lighting accents.
 */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-transparent px-6 py-28 overflow-hidden"
    >
      {/* ── Radiant Neon Lighting Orbs in the section background ── */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full bg-[#00f0ff]/15 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[420px] w-[420px] rounded-full bg-[#a855f7]/15 blur-[140px] animate-pulse" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* ── Section Title with Neon Glow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="mb-12 text-center"
        >
          <h2
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{
              textShadow: '0 0 25px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
            }}
          >
            ABOUT <span className="text-[#00f0ff]">ME</span>
          </h2>
          {/* Glowing neon accent line */}
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />
        </motion.div>

        {/* ── Ultra-Glassmorphic Card with Neon Glow Border ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
          className="rounded-3xl border border-[#00f0ff]/30 bg-black/40 p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.12)] transition-all duration-300 hover:border-[#00f0ff]/60 hover:shadow-[0_0_60px_rgba(0,240,255,0.22)]"
        >
          <p className="text-lg leading-relaxed text-gray-200 md:text-xl md:leading-loose">
            I am a <span className="font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">BCA student</span> at{' '}
            <span className="font-semibold text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">Amity University Rajasthan, Jaipur</span>,{' '}
            passionate about software development, web technologies, AI tools, and building creative digital experiences. I enjoy learning new technologies and turning ideas into practical projects.
          </p>

          <div className="mt-8 pt-8 border-t border-[#00f0ff]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-[#00f0ff]/20 bg-black/30 p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.06)] hover:border-[#00f0ff]/50 transition-colors">
              <span className="text-xs uppercase tracking-widest text-[#00f0ff]">Course</span>
              <p className="mt-1 font-bold text-white text-lg">BCA</p>
            </div>
            <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-5 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.06)] hover:border-purple-500/50 transition-colors">
              <span className="text-xs uppercase tracking-widest text-purple-300">Institution</span>
              <p className="mt-1 font-bold text-white text-base">Amity University Rajasthan</p>
            </div>
            <div className="rounded-2xl border border-[#00f0ff]/20 bg-black/30 p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.06)] hover:border-[#00f0ff]/50 transition-colors">
              <span className="text-xs uppercase tracking-widest text-[#00f0ff]">Location</span>
              <p className="mt-1 font-bold text-white text-base">Jaipur, Rajasthan, India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
