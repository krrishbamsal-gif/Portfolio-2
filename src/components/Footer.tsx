'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 py-12 text-center"
    >
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-4">
        {/* Navigation links & Direct Contacts */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-300">
          <a
            href="mailto:krrishbamsal@gmail.com"
            className="hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
          >
            <span className="text-[#00f0ff]">&bull;</span> krrishbamsal@gmail.com
          </a>
          <a
            href="tel:+918602730727"
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            <span className="text-purple-400">&bull;</span> +91 8602730727
          </a>
          <a
            href="https://www.linkedin.com/in/krrish-bansal-24b5aa37b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00f0ff] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/krrishbamsal-gif"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00f0ff] transition-colors"
          >
            GitHub
          </a>
        </div>

        <p className="text-sm text-gray-400">
          &copy; 2026 <span className="text-white font-bold tracking-wide">KRRISH BANSAL</span>. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Designed with a cinematic aesthetic &bull; Built with Next.js, Three.js &amp; Framer Motion
        </p>
      </div>
    </motion.footer>
  );
}
