import { useEffect, useState } from 'react';

function isExternalUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

export default function MediaImage({
  src,
  alt,
  fallback,
  aspect = 'video',
  className = '',
  overlay,
  rounded = true,
  priority = false,
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallback);
    setFailed(false);
  }, [src, fallback]);

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      return;
    }
    setFailed(true);
  };

  if (!src && !fallback) return null;

  return (
    <figure
      className={`media-frame media-frame--${aspect}${
        rounded ? ' media-frame--rounded' : ''
      }${failed ? ' media-frame--fallback' : ''} ${className}`.trim()}
    >
      {!failed ? (
        <img
          src={currentSrc || fallback}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="media-frame__img"
          referrerPolicy={isExternalUrl(currentSrc) ? 'no-referrer' : undefined}
          onError={handleError}
        />
      ) : (
        <div className="media-frame__placeholder" role="img" aria-label={alt}>
          <span className="media-frame__placeholder-icon" aria-hidden />
        </div>
      )}
      {overlay ? <div className="media-frame__overlay">{overlay}</div> : null}
    </figure>
  );
}
