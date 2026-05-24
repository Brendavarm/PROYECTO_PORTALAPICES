import { motion } from 'framer-motion';

const shapes = [
  { x: '12%', y: '22%', size: 48, delay: 0 },
  { x: '82%', y: '18%', size: 36, delay: 0.6 },
  { x: '78%', y: '68%', size: 56, delay: 1.1 },
  { x: '18%', y: '72%', size: 40, delay: 1.6 },
];

export default function SportsAnimations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {shapes.map((item, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-gold/15 bg-gold/5"
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
