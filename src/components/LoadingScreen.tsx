'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ParticleAssembleImage from './ParticleAssembleImage';

interface LoadingScreenProps {
  isLoading: boolean;
}

const letterAnimation = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.6 + i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const firstName = 'KRRISH';
  const lastName = 'BANSAL';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] px-4 overflow-hidden"
        >
          {/* ── Background subtle radial glow ── */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[550px] w-[550px] rounded-full bg-[#00f0ff]/10 blur-[160px]" />
            <div className="h-[400px] w-[400px] rounded-full bg-[#a855f7]/10 blur-[140px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* ── Transparent Cutout Particle Assembled Photo ── */}
            <div className="mb-5">
              <ParticleAssembleImage
                imageSrc="/images/krrish-cutout.png"
                width={200}
                height={265}
              />
            </div>

            {/* ── Unique Cinematic Letter-by-Letter Hologram Full Name Animation ── */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6">
              {/* KRRISH */}
              <div className="flex">
                {firstName.split('').map((char, index) => (
                  <motion.span
                    key={`first-${index}`}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={letterAnimation}
                    className="text-4xl sm:text-6xl font-black tracking-[0.12em] text-[#00f0ff] inline-block"
                    style={{
                      textShadow:
                        '0 0 20px rgba(0,240,255,0.8), 0 0 50px rgba(0,240,255,0.4), 0 0 90px rgba(168,85,247,0.3)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* BANSAL */}
              <div className="flex">
                {lastName.split('').map((char, index) => (
                  <motion.span
                    key={`last-${index}`}
                    custom={firstName.length + index}
                    initial="hidden"
                    animate="visible"
                    variants={letterAnimation}
                    className="text-4xl sm:text-6xl font-black tracking-[0.12em] text-white inline-block"
                    style={{
                      textShadow:
                        '0 0 20px rgba(255,255,255,0.7), 0 0 45px rgba(168,85,247,0.5)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Animated Underline Beam */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              className="mt-3 h-1 w-44 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-gray-300 font-semibold"
            >
              Software &bull; Web &bull; AI
            </motion.p>

            {/* ── Circular Spinner with Progress Ring ── */}
            <div className="relative mt-5 h-8 w-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00f0ff] border-r-[#00f0ff]/40"
                style={{
                  boxShadow: '0 0 15px rgba(0,240,255,0.4)',
                }}
              />
            </div>

            <motion.span
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-3 text-[10px] tracking-[0.3em] text-[#00f0ff]/80 uppercase font-medium"
            >
              Initializing Universe
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
