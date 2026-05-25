import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MediaImage from './MediaImage';
import FeatureIcon from './FeatureIcon';
import { resolveImage } from '../../data/siteImages';

const cardMotion = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const imageMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/** Tarjeta estilo revista deportiva con hover animado */
export default function EditorialCard({
  to,
  imageSrc,
  imageAlt,
  icon,
  label,
  teaser,
  featured = false,
  onClick,
  as = 'link',
  imageFallback,
}) {
  const img = resolveImage(
    typeof imageSrc === 'object' && imageSrc?.src != null
      ? imageSrc
      : { src: imageSrc, fallback: imageFallback, alt: imageAlt }
  );

  const className = `editorial-card${featured ? ' editorial-card--featured' : ''}${
    onClick ? ' editorial-card--button' : ''
  }`;

  const inner = (
    <>
      <motion.div
        className="editorial-card__media-wrap"
        variants={imageMotion}
      >
        <MediaImage
          src={img.src}
          fallback={img.fallback}
          alt={imageAlt || img.alt}
          aspect="banner"
          rounded={false}
          className="editorial-card__media"
        />
        <span className="editorial-card__shine" aria-hidden />
      </motion.div>
      <div className="editorial-card__body">
        {icon && <FeatureIcon name={icon} className="editorial-card__icon" />}
        <h3 className="editorial-card__title">{label}</h3>
        <p className="editorial-card__teaser">{teaser}</p>
        <motion.span
          className="editorial-card__cta"
          initial={false}
          variants={{
            rest: { x: 0 },
            hover: { x: 4 },
          }}
        >
          Ver más
        </motion.span>
      </div>
      <span className="editorial-card__accent" aria-hidden />
    </>
  );

  if (as === 'button') {
    return (
      <motion.button
        type="button"
        className={className}
        onClick={onClick}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardMotion}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardMotion}
      className="editorial-card-wrap"
    >
      <Link to={to} className={className}>
        {inner}
      </Link>
    </motion.div>
  );
}
