import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, spring } from '../../motion/motionPresets';

export function StaggerGrid({ children, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
