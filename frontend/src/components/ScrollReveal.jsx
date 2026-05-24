import { motion } from 'framer-motion';
import { fadeUp, spring } from '../motion/motionPresets';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const offset = direction === 'left' ? { x: -32 } : direction === 'right' ? { x: 32 } : { y: 32 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}
