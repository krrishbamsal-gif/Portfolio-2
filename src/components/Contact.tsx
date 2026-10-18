'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SocialLink {
  label: string;
  href: string;
  note?: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/krrish-bansal-24b5aa37b/',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/krrishbamsal-gif',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: 'Portfolio Code',
    href: 'https://github.com/krrishbamsal-gif/Portfolio',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[70vh] bg-transparent px-6 py-28 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* ── Neon ambient lighting orbs ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/15 blur-[160px] animate-pulse" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ── Section Title with Neon Glow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="mb-14 text-center"
        >
          <h2
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{
              textShadow: '0 0 25px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
            }}
          >
            GET IN <span className="text-[#00f0ff]">TOUCH</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />
        </motion.div>

        {/* ── Contact Card with Neon Glow Border ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="rounded-3xl border border-[#00f0ff]/30 bg-black/40 p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] transition-all duration-300 hover:border-[#00f0ff]/60 hover:shadow-[0_0_60px_rgba(0,240,255,0.25)]"
        >
          <p className="text-center text-lg leading-relaxed text-gray-200 md:text-xl">
            I&apos;m always open to discussing software development, innovative web projects, creative collaborations, or new tech opportunities.
          </p>

          {/* ── Direct Contact Cards (Email & Phone) ── */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <a
              href="mailto:krrishbamsal@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-[#00f0ff]/30 bg-black/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-[1.02]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/15 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Me</span>
                <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#00f0ff] transition-colors truncate">
                  krrishbamsal@gmail.com
                </p>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+918602730727"
              className="group flex items-center gap-4 rounded-2xl border border-purple-500/30 bg-black/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/15 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Call / WhatsApp</span>
                <p className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  +91 8602730727
                </p>
              </div>
            </a>
          </div>

          {/* Location highlight with Neon Icon */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#00f0ff]">
            <svg className="h-4 w-4 drop-shadow-[0_0_8px_#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-semibold text-white">Jaipur, Rajasthan, India</span>
          </div>

          {/* Social Profiles Grid with Neon Hover Glow */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
