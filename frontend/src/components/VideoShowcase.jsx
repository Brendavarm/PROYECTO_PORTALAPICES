import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CinematicVideo from './ui/CinematicVideo';

/**
 * @param {'featured' | 'compact' | 'card'} variant
 * @param {boolean} autoStart — intentar autoplay silenciado
 * @param {boolean} playOnMount — si true, al cargar el componente (p. ej. landing al abrir la página)
 */
export default function VideoShowcase({
  config,
  variant = 'featured',
  className = '',
  autoStart = true,
  playOnMount = false,
}) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);

  const sources = [{ src: config.src, type: 'video/mp4' }];

  const tryAutoplay = useCallback(() => {
    if (!autoStart || userPausedRef.current) return;
    if (!playOnMount && !inView) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* política del navegador */
      });
  }, [autoStart, inView, playOnMount]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !autoStart) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && !userPausedRef.current) {
          tryAutoplay();
        }
      },
      { threshold: 0.2, rootMargin: '40px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoStart, tryAutoplay, config.src]);

  const handleCanPlay = useCallback(() => {
    tryAutoplay();
  }, [tryAutoplay]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
  }, []);

  const isCompact = variant === 'compact';
  const isCard = variant === 'card';

  return (
    <motion.article
      ref={rootRef}
      className={`video-showcase video-showcase--${variant} ${className}`.trim()}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
    >
      {variant === 'featured' && (
        <header className="video-showcase__header">
          <p className="eyebrow">{config.badge}</p>
          <h2 className="heading-display heading-display--sm mt-2">{config.title}</h2>
          {config.lead && <p className="video-showcase__lead">{config.lead}</p>}
        </header>
      )}

      {(isCard || isCompact) && (
        <div className="video-showcase__card-head">
          <p className="eyebrow text-[10px]">{config.badge}</p>
          <h3 className="heading-md mt-1">{config.title}</h3>
          {config.lead && <p className="mt-2 text-sm text-muted leading-relaxed">{config.lead}</p>}
        </div>
      )}

      <div className={`video-showcase__frame${isCard || isCompact ? ' mt-4' : ''}`}>
        <span className="video-showcase__glow" aria-hidden />
        <div className="video-showcase__screen">
          <CinematicVideo
            ref={videoRef}
            sources={sources}
            poster={config.poster}
            posterFallback={config.posterFallback}
            alt={config.alt}
            className="video-showcase__video video-showcase__video--active"
            autoPlay={false}
            managePlayback={false}
            muted={muted}
            loop
            controls={false}
            priority={false}
            preload="metadata"
            onCanPlay={handleCanPlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          <span className="video-showcase__overlay" aria-hidden />
          {!isCompact && !isCard && (
            <span className="video-showcase__badge">{config.badge}</span>
          )}
          <div className="video-showcase__controls">
            <button type="button" className="video-showcase__ctrl" onClick={togglePlay}>
              {playing ? 'Pausar' : 'Reproducir'}
            </button>
            <button type="button" className="video-showcase__ctrl" onClick={toggleMute}>
              {muted ? 'Activar sonido' : 'Silenciar'}
            </button>
          </div>
        </div>
      </div>

      {config.caption && !isCard && (
        <p className="video-showcase__caption">{config.caption}</p>
      )}
    </motion.article>
  );
}
