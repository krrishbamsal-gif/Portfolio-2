'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  imageSrc: string;
  verifyUrl: string;
  description: string;
}

const verifiedCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Internship Program in Artificial Intelligence',
    issuer: '1stop.ai (in collaboration with Fox)',
    date: '01 Jun, 2026 – 31 Jul, 2026',
    badge: 'Internship Certificate',
    imageSrc: '/images/certificate-internship-ai.jpg',
    verifyUrl: 'https://1stop.ai/verify-certificate',
    description:
      'Successfully completed intensive internship program in Artificial Intelligence. Evaluated as dedicated, hardworking, and diligent with hands-on AI project execution.',
  },
  {
    id: 'cert-2',
    title: 'Certificate of Participation in Artificial Intelligence',
    issuer: 'KSHITIJ, IIT Kharagpur (in association with 1stop.ai)',
    date: '01 Jun, 2026 – 31 Jul, 2026 (Issued 07-Aug-2026)',
    badge: 'IIT Kharagpur / 1stop',
    imageSrc: '/images/certificate-kshitij-iit.jpg',
    verifyUrl: 'https://1stop.ai/verify-certificate',
    description:
      'Proudly presented to Krrish Bansal for participating and successfully completing the technical program in Artificial Intelligence organized by Kshitij, IIT Kharagpur & 1stop.ai.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative min-h-[60vh] bg-transparent px-6 py-28 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* ── Neon ambient lighting orbs ── */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-[450px] w-[450px] rounded-full bg-[#00f0ff]/12 blur-[150px] animate-pulse" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#a855f7]/12 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section title with Neon Glow ── */}
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
            VERIFIED <span className="text-[#00f0ff]">CERTIFICATES</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />
          <p className="mt-4 text-sm text-gray-300">
            Official credentials &amp; technical certifications earned by Krrish Bansal
          </p>
        </motion.div>

        {/* ── Certificate Cards Grid ── */}
        <div className="grid gap-8 md:grid-cols-2">
          {verifiedCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00f0ff]/60 hover:bg-black/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)]"
            >
              <div>
                {/* Certificate Preview Image with Neon Frame */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <img
                    src={cert.imageSrc}
                    alt={cert.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay with View indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff] bg-[#00f0ff]/20 px-4 py-2 text-xs font-bold text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Badge & Issuer */}
                <div className="mt-5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/15 px-3 py-1 text-xs font-bold text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    {cert.badge}
                  </span>
                  <span className="text-xs text-gray-300 font-medium">{cert.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="mt-1 text-xs font-medium text-gray-300">
                  Issued by: <span className="text-white font-semibold">{cert.issuer}</span>
                </p>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-gray-400">
                  {cert.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  View Full Certificate
                </button>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-[#00f0ff]/20 px-3.5 py-2 text-xs font-bold text-[#00f0ff] hover:bg-[#00f0ff]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  Verify Online
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal for Full Certificate View ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl border border-[#00f0ff]/40 bg-[#0a0a0f] p-4 shadow-[0_0_60px_rgba(0,240,255,0.4)]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-[#00f0ff] hover:text-black transition-colors"
              >
                &times;
              </button>

              <img
                src={selectedCert.imageSrc}
                alt={selectedCert.title}
                className="max-h-[75vh] w-auto rounded-lg object-contain mx-auto"
              />

              <div className="mt-3 text-center">
                <h4 className="text-base font-bold text-white">{selectedCert.title}</h4>
                <p className="text-xs text-gray-400">{selectedCert.issuer} &bull; {selectedCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
