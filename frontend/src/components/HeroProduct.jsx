import { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCT_PHOTOS } from '../data/siteImages';
import productHeroSvg from '../assets/covers/product-hero.svg';

/** Vista del producto en el hero — foto real con respaldo local */
export default function HeroProduct() {
  const { src, alt } = PRODUCT_PHOTOS.hero;
  const fallback = productHeroSvg;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <motion.div
      className="product-showcase product-showcase--hero"
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="product-showcase__frame"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={imgSrc}
          alt={alt}
          className="product-showcase__img"
          width={480}
          height={600}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (fallback && imgSrc !== fallback) setImgSrc(fallback);
          }}
        />
      </motion.div>
    </motion.div>
  );
}
