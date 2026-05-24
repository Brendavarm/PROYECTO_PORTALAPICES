import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden h-8 w-8 rounded-full border border-gold/50 md:block"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden h-2 w-2 rounded-full bg-gold md:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
    </>
  );
}
