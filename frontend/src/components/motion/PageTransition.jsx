import { motion } from 'framer-motion';
import { pageTransition } from '../../motion/motionPresets';

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page-transition"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
