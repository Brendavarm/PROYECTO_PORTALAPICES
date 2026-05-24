import MediaImage from './MediaImage';

/** Banner visual para secciones (imagen + contenido opcional) */
export default function SectionVisual({
  src,
  alt,
  children,
  layout = 'below',
  className = '',
}) {
  if (layout === 'side') {
    return (
      <div className={`section-visual section-visual--side ${className}`}>
        <MediaImage src={src} alt={alt} aspect="landscape" className="section-visual__media" />
        {children ? <div className="section-visual__body">{children}</div> : null}
      </div>
    );
  }

  return (
    <div className={`section-visual ${className}`}>
      <MediaImage
        src={src}
        alt={alt}
        aspect="wide"
        className="section-visual__media"
        overlay={
          children ? (
            <div className="section-visual__overlay-content">{children}</div>
          ) : null
        }
      />
    </div>
  );
}
