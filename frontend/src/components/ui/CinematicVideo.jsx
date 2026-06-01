import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MediaImage from './MediaImage';

/**
 * Video cinematográfico con poster local y fallback a imagen si falla la carga.
 */
const CinematicVideo = forwardRef(function CinematicVideo(
  {
    sources = [],
    poster,
    posterFallback,
    alt = '',
    className = '',
    autoPlay = true,
    muted = true,
    loop = true,
    controls = false,
    priority = false,
    preload,
    onPlay,
    onPause,
    onEnded,
    onCanPlay,
    /** Si false, el padre controla play/pausa (evita reanudar tras pausar) */
    managePlayback = true,
  },
  ref
) {
  const preloadMode = preload ?? (priority ? 'auto' : 'metadata');
  const videoRef = useRef(null);
  const userPausedRef = useRef(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!managePlayback) return undefined;
    const video = videoRef.current;
    if (!video || failed) return undefined;

    const tryPlay = () => {
      if (!autoPlay || userPausedRef.current) return;
      if (!video.paused) return;
      video.play().catch(() => {
        /* autoplay bloqueado — el poster sigue visible */
      });
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    return () => video.removeEventListener('canplay', tryPlay);
  }, [autoPlay, failed, sources, managePlayback]);

  const handlePause = (e) => {
    userPausedRef.current = true;
    onPause?.(e);
  };

  const handlePlay = (e) => {
    onPlay?.(e);
  };

  if (failed || !sources.length) {
    return (
      <MediaImage
        src={poster}
        fallback={posterFallback}
        alt={alt}
        aspect="cinematic"
        rounded={false}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`cinematic-video${ready ? ' cinematic-video--ready' : ''} ${className}`.trim()}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
      preload={preloadMode}
      aria-label={alt}
      onLoadedData={() => {
        setReady(true);
        onCanPlay?.();
      }}
      onCanPlay={() => {
        setReady(true);
        onCanPlay?.();
      }}
      onError={() => setFailed(true)}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={onEnded}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type || 'video/mp4'} />
      ))}
    </video>
  );
});

export default CinematicVideo;
