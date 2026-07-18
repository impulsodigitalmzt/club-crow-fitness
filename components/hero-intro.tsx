'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

/**
 * Secuencia de entrada del hero: el muro de video aparece primero (ver
 * HeroVideoWall), después cada palabra del título entra deslizándose de
 * izquierda a derecha, y al final la leyenda y los botones se despliegan.
 */
const WALL_DELAY = 0.9;
/** Cada palabra tarda esto en llegar al centro; la siguiente espera a que termine. */
const WORD_DURATION = 1.2;
const FIRST_WORD_DELAY = WALL_DELAY + 0.4;
const TITLE_DONE = FIRST_WORD_DELAY + WORD_DURATION * 3;
/** El logo entra al final, cuando los botones ya terminaron. */
const LOGO_DELAY = TITLE_DONE + 2.1;

const words = [
  { text: 'Voluntad,', className: 'text-white' },
  { text: 'Disciplina,', className: 'text-zinc-400' },
  {
    text: 'Constancia',
    className: 'text-gradient-brand [text-shadow:none] drop-shadow-[0_4px_24px_rgba(0,0,0,.85)]',
  },
];

export function HeroIntro() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* El logo sale girando desde el centro de la pantalla y se coloca arriba del letrero */}
      <motion.img
        src="/logo.png"
        alt="Logo Crow Fitness Club"
        initial={{ opacity: 0, y: '34vh', scale: 2.4, rotate: -540 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ delay: LOGO_DELAY, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 w-24 object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,.8)] sm:w-28"
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: WALL_DELAY, duration: 0.6 }}
        className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-brand-light [text-shadow:0_2px_10px_rgba(0,0,0,.9)]"
      >
        Crow Fitness Club · Mazatlán
      </motion.p>

      <h1 className="font-display text-6xl font-black uppercase italic leading-[0.84] tracking-[-0.055em] text-white [text-shadow:0_4px_24px_rgba(0,0,0,.85)] sm:text-8xl lg:text-[7.5rem]">
        {words.map((word, index) => (
          <motion.span
            key={word.text}
            initial={{ opacity: 0, x: '-55vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: FIRST_WORD_DELAY + index * WORD_DURATION,
              duration: WORD_DURATION,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className={`block ${word.className}`}
          >
            {word.text}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TITLE_DONE, duration: 0.4 }}
        className="mt-10 w-full max-w-2xl border-t border-white/25 pt-7"
      >
        {/* La leyenda se despliega de izquierda a derecha con un recorte animado */}
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: TITLE_DONE + 0.1, duration: 1.1, ease: 'easeOut' }}
          className="mx-auto max-w-xl text-base leading-relaxed text-zinc-200 [text-shadow:0_2px_12px_rgba(0,0,0,.9)] sm:text-lg"
        >
          Construimos un espacio alrededor de una idea simple: mejores herramientas, mejor acompañamiento y una comunidad que te impulsa a avanzar.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { href: '/app/registro', label: 'Únete ahora', className: 'bg-brand text-white hover:bg-brand-dark' },
            {
              href: '/gimnasio',
              label: 'Conoce Crow',
              className: 'border border-white/25 text-white backdrop-blur hover:bg-white hover:text-black',
            },
          ].map((button, index) => (
            <motion.div
              key={button.href}
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: TITLE_DONE + 1.1 + index * 0.25, duration: 0.7, ease: 'easeOut' }}
            >
              <Link
                href={button.href}
                className={`inline-block rounded-full px-6 py-4 text-xs font-black uppercase tracking-wider ${button.className}`}
              >
                {button.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
