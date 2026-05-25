import { motion } from 'framer-motion';

const SOCCER_BALL_SRC = '/images/soccer-ball.svg';

/**
 * Balón de fútbol realista (SVG Noto) — giro + rebote suave.
 */
export default function AnimatedBall({ className = '', fast = false, size = 'lg' }) {
  const sizeClass =
    size === 'sm' ? 'soccer-ball-spin--sm' : size === 'md' ? 'soccer-ball-spin--md' : 'soccer-ball-spin--lg';

  return (
    <motion.div
      className={`soccer-ball-spin ${sizeClass} ${className}`.trim()}
      animate={{ y: [0, -16, 0], rotate: [0, 360] }}
      transition={{
        y: { duration: fast ? 0.85 : 1.5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: fast ? 1.05 : 2.2, repeat: Infinity, ease: 'linear' },
      }}
    >
      <img
        src={SOCCER_BALL_SRC}
        alt=""
        className="soccer-ball-spin__img"
        width={128}
        height={128}
        decoding="async"
        draggable={false}
      />
      <span className="soccer-ball-spin__shadow" aria-hidden />
    </motion.div>
  );
}
