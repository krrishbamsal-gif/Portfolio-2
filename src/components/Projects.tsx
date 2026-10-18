'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Planned';

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  github: string;
  live?: string;
}

const verifiedProjects: ProjectItem[] = [
  {
    title: 'Personal Developer Portfolio',
    category: 'Web Application',
    status: 'Completed',
    description:
      'A cinematic, interactive developer portfolio website featuring a custom 3D particle constellation and vortex background, mouse/touch-responsive physics, glassmorphism UI, and smooth page transitions.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    github: 'https://github.com/krrishbamsal-gif/Portfolio',
    live: 'http://localhost:3000',
  },
  {
    title: 'AI Notes Maker (NotesPro AI)',
    category: 'AI & Productivity',
    status: 'In Progress',
    description:
      'An intelligent note-taking application concept utilizing modern AI tools to automatically summarize, structure, generate key takeaways, and index study notes for students and developers.',
    tags: ['AI Tools', 'JavaScript', 'Python', 'Web Development'],
    github: 'https://github.com/krrishbamsal-gif',
  },
  {
    title: 'AI Resume Analyzer',
    category: 'AI & Career',
    status: 'Planned',
    description:
      'A planned intelligent tool designed to parse developer resumes, compare skill sets against industry tech stacks, and provide automated recommendations for software engineering roles.',
    tags: ['Python', 'AI Tools', 'Data Processing'],
    github: 'https://github.com/krrishbamsal-gif',
  },
  {
    title: 'Interactive Web Apps & JS Playground',
    category: 'Web Experiments',
    status: 'In Progress',
    description:
      'A collection of interactive web experiments, creative JavaScript components, algorithms, and responsive UI prototypes exploring modern frontend technologies.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
    github: 'https://github.com/krrishbamsal-gif',
  },
];

const STATUS_BADGES: Record<ProjectStatus, string> = {
  Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
  'In Progress': 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]',
  Planned: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');

  const filteredProjects =
    filter === 'All'
      ? verifiedProjects
      : verifiedProjects.filter((p) => p.status === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-transparent px-6 py-28 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* ── Neon ambient lighting orbs ── */}
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/15 blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#a855f7]/15 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="mb-10 text-center"
        >
          <h2
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{
              textShadow: '0 0 25px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
            }}
          >
            FEATURED <span className="text-[#00f0ff]">PROJECTS</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />
          <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
            Real repositories and verified projects from my GitHub profile.
          </p>

          {/* ── Neon Filter Buttons ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {(['All', 'Completed', 'In Progress', 'Planned'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-105'
                    : 'border border-white/15 bg-black/40 text-gray-300 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Projects Grid with Neon Glow Borders ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-7 md:p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00f0ff]/60 hover:bg-black/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]"
            >
              <div>
                {/* Header: Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00f0ff]">
                    {project.category}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-bold ${
                      STATUS_BADGES[project.status]
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* Tech Tags with Neon Pill Glow */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-2.5 py-1 text-[11px] font-semibold text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Repository
                </a>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#00f0ff] px-4 py-2 text-xs font-bold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.7)] hover:scale-105"
                  >
                    <span>Live Preview</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-400 italic">
                    Demo available soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All Repositories on GitHub CTA ── */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/krrishbamsal-gif?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/40 bg-black/40 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105"
          >
            <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>View All Repositories on GitHub</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
