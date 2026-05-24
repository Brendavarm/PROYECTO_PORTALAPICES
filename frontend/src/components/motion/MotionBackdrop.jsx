import { motion } from 'framer-motion';
import Particles from '../Particles';
import SportsAnimations from '../SportsAnimations';

/** Capa decorativa con partículas y orbes en movimiento (hero / secciones) */
export default function MotionBackdrop({ intensity = 'medium' }) {
  const count = intensity === 'light' ? 24 : intensity === 'strong' ? 56 : 40;

  return (
    <div className="motion-backdrop" aria-hidden>
      <Particles count={count} />
      <SportsAnimations />
      <motion.div
        className="motion-backdrop__orb motion-backdrop__orb--1"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="motion-backdrop__orb motion-backdrop__orb--2"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 25, -35, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="motion-backdrop__line"
        animate={{ opacity: [0.15, 0.35, 0.15], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
