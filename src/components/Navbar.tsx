'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-white/5'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* ---- Brand Full Name Logo ---- */}
          <button
            onClick={() => scrollTo('#home')}
            className="group relative flex items-center gap-2 text-xl sm:text-2xl font-black tracking-widest text-white select-none"
          >
            <span className="text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">
              KRRISH
            </span>
            <span className="text-white group-hover:text-purple-300 transition-colors">
              BANSAL
            </span>
          </button>

          {/* ---- Desktop links ---- */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="group relative text-sm font-semibold tracking-wider text-gray-300 transition-colors duration-300 hover:text-[#00f0ff]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* ---- Mobile Hamburger Button ---- */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50"
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-[#00f0ff] transition-transform duration-300 ${
                mobileOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-[#00f0ff] transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-[#00f0ff] transition-transform duration-300 ${
                mobileOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* ---- Mobile full-screen overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.3 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-2xl font-bold tracking-widest text-white transition-colors duration-300 hover:text-[#00f0ff]"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
