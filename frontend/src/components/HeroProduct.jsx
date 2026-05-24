import { motion } from 'framer-motion';
import { SITE_IMAGES } from '../data/siteImages';

/** Vista del producto en el hero — imagen grande y siempre visible */
export default function HeroProduct() {
  return (
    <motion.div
      className="product-showcase product-showcase--hero"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="product-showcase__frame"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={SITE_IMAGES.productHero.src}
          alt={SITE_IMAGES.productHero.alt}
          className="product-showcase__img"
          width={400}
          height={520}
          loading="eager"
          decoding="async"
        />
        <span className="product-showcase__badge">
          Impreso en 3D
        </span>
      </motion.div>
    </motion.div>
  );
}
