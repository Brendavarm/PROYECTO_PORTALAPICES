import { motion } from 'framer-motion';
import AnimatedBall from '../AnimatedBall';

export default function PageBallLoader({ label = 'Cargando…' }) {
  return (
    <motion.div
      className="page-ball-loader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <AnimatedBall fast size="md" />
      <p className="page-ball-loader__label">{label}</p>
    </motion.div>
  );
}
