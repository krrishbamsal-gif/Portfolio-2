'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export type SkillLevel = 'Proficient' | 'Learning';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export const SKILLS: Skill[] = [
  { name: 'HTML', level: 'Proficient' },
  { name: 'CSS', level: 'Proficient' },
  { name: 'C/C++', level: 'Proficient' },
  { name: 'JavaScript', level: 'Learning' },
  { name: 'Python', level: 'Learning' },
  { name: 'Git', level: 'Learning' },
  { name: 'GitHub', level: 'Learning' },
  { name: 'AI Tools', level: 'Learning' },
];

/* ── Neon Badge styling ── */
const BADGE_STYLES: Record<SkillLevel, string> = {
  Proficient: 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.4)]',
  Learning: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center bg-transparent px-6 py-28 overflow-hidden"
    >
      {/* ── Radiant Neon Lighting Orbs in Skills background ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[#00f0ff]/10 blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute right-10 top-1/4 h-[350px] w-[350px] rounded-full bg-[#a855f7]/15 blur-[140px]" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* ── Section Title with Neon Glow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="mb-14 text-center"
        >
          <h2
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{
              textShadow: '0 0 25px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
            }}
          >
            SKILLS &amp; <span className="text-[#00f0ff]">EXPERTISE</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />

          {/* ── Status Legend with Neon indicators ── */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-300">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
              <span className="font-semibold text-white">Proficient</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]" />
              <span className="font-semibold text-white">Learning</span>
            </span>
          </div>
        </motion.div>

        {/* ── Glassmorphic Cards with Neon Edges ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              className="group relative flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-white/10 bg-black/40 px-5 py-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f0ff]/70 hover:bg-black/60 hover:shadow-[0_0_35px_rgba(0,240,255,0.35)]"
            >
              {/* Neon accent top line */}
              <div
                className={`h-1 w-10 rounded-full transition-all duration-300 group-hover:w-20 ${
                  skill.level === 'Proficient'
                    ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]'
                    : 'bg-purple-400 shadow-[0_0_10px_#a855f7]'
                }`}
              />

              {/* Skill Name */}
              <span className="text-base sm:text-lg font-bold tracking-wide text-white group-hover:text-[#00f0ff] transition-colors">
                {skill.name}
              </span>

              {/* Status Pill Badge with Neon Glow */}
              <span
                className={`inline-flex items-center rounded-full border px-3.5 py-0.5 text-[11px] font-bold tracking-wider ${
                  BADGE_STYLES[skill.level]
                }`}
              >
                {skill.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
