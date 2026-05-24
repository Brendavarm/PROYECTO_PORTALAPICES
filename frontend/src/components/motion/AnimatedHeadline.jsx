import { motion } from 'framer-motion';
import { easeOut } from '../../motion/motionPresets';

/** Título con palabras que entran una tras otra */
export default function AnimatedHeadline({
  lines,
  className = 'heading-display',
  delay = 0.2,
}) {
  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="animated-headline__line">
          {line.parts.map((part, i) => (
            <motion.span
              key={`${lineIndex}-${i}`}
              className={part.accent ? 'accent-word' : undefined}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: delay + lineIndex * 0.12 + i * 0.1,
                ease: easeOut,
              }}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {part.text}
            </motion.span>
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </h1>
  );
}
