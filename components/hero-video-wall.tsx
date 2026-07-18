'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

/**
 * Un video fijo y distinto por tarjeta (loop).
 * Sin rotación entre clips → no se repiten en celdas vecinas.
 */
const heroVideos = [
  '/videos/hero/evaluacion-coach.mp4',
  '/videos/hero/funcional-intenso.mp4',
  '/videos/hero/hero-modo-playa.mp4',
  '/videos/hero/AQPYTmOF6npq6ZJFOet6HytPogCcxVxBptA_Gzw3k-F-Bc5h9l3MsqlnHlEFM3_JApmty0d-GlkLRlOv2vW_pKUClS2Qz1K_h6-Fujvhqw.mp4',
  '/videos/hero/AQP47QEd69v_RjmOKAMcxhWJ8T4iItR5UIltIO4B2ImL1ilQnnrsv4OJao5C2IakFJ7eRt59LP9hdGplnjZu9KCjF5vG-dq-JydFG84.mp4',
] as const;

function WallCell({
  src,
  tall = false,
}: {
  src: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    const shell = shellRef.current;
    if (!video || !shell) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.12 },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={shellRef}
      className="relative w-full shrink-0 overflow-hidden bg-zinc-950"
      style={{
        height: tall ? '104vh' : '52vh',
        minHeight: tall ? '640px' : '320px',
      }}
    >
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

/** 5 videos únicos: ninguna tarjeta comparte el mismo clip. */
const columns = [
  {
    offset: '-10vh',
    className: 'flex',
    cells: [
      { src: heroVideos[0], tall: false },
      { src: heroVideos[3], tall: false },
    ],
  },
  {
    offset: '-36vh',
    className: 'flex',
    cells: [
      { src: heroVideos[1], tall: false },
      { src: heroVideos[4], tall: false },
    ],
  },
  {
    offset: '-22vh',
    className: 'hidden sm:flex',
    cells: [{ src: heroVideos[2], tall: true }],
  },
] as const;

export function HeroVideoWall() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex gap-1.5 sm:gap-2">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`${column.className} min-w-0 flex-1 flex-col gap-1.5 sm:gap-2`}
            style={{ transform: `translateY(${column.offset})` }}
          >
            {column.cells.map((cell) => (
              <WallCell key={cell.src} src={cell.src} tall={cell.tall} />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 to-transparent" />
    </motion.div>
  );
}
