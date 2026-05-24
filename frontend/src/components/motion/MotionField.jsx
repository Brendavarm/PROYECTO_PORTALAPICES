import { motion } from 'framer-motion';

/** Campo de formulario con entrada suave al hacer focus */
export default function MotionField({ children, className = '' }) {
  return (
    <motion.div
      className={`motion-field ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileFocusWithin={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
    >
      {children}
      <motion.span
        className="motion-field__underline"
        layoutId={undefined}
        initial={{ scaleX: 0 }}
        whileFocusWithin={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
        aria-hidden
      />
    </motion.div>
  );
}
