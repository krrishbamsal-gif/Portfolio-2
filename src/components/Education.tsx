'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-[60vh] bg-transparent px-6 py-28 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* ── Neon ambient lighting orbs ── */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/12 blur-[150px] animate-pulse" />

      {/* ── Section title with Neon Glow ── */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mb-14 text-center text-4xl font-extrabold tracking-widest md:text-5xl"
        style={{
          textShadow: '0 0 25px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
        }}
      >
        <span className="text-white">EDU</span>
        <span className="text-[#00f0ff]">CATION</span>
      </motion.h2>

      {/* ── Education card with Neon Border ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto max-w-2xl"
      >
        <div
          className="group relative overflow-hidden rounded-3xl border border-white/10
                     bg-black/40 p-8 backdrop-blur-2xl transition-all duration-300
                     hover:-translate-y-1.5 hover:border-[#00f0ff]/60 hover:bg-black/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]"
        >
          {/* Degree */}
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="Graduation Cap">
              🎓
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
              Bachelor of Computer Applications (BCA)
            </h3>
          </div>

          {/* University */}
          <p className="mt-4 text-base font-medium text-gray-200">
            Amity University Rajasthan
          </p>

          {/* Location with neon icon */}
          <div className="mt-2 flex items-center gap-2 text-sm text-[#00f0ff]">
            <svg
              className="h-4 w-4 drop-shadow-[0_0_8px_#00f0ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Jaipur, Rajasthan, India</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
