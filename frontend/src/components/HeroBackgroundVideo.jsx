import { useCallback, useState } from 'react';
import { HERO_BACKGROUND_VIDEO } from '../data/siteVideos';

/**
 * Fondo del hero: fotos locales + video MP4 (sin YouTube — FIFA bloquea embed).
 */
export default function HeroBackgroundVideo() {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [mp4Ready, setMp4Ready] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  const { mp4Sources, fallbackImage, matchPoster } = HERO_BACKGROUND_VIDEO;
  const currentSource = mp4Sources[sourceIndex];
  const heroPoster = matchPoster || fallbackImage;

  const tryNextSource = useCallback(() => {
    setMp4Ready(false);
    setSourceIndex((i) => {
      const next = i + 1;
      if (next >= mp4Sources.length) {
        setAllFailed(true);
        return i;
      }
      return next;
    });
  }, [mp4Sources.length]);

  return (
    <div className="hero-cinematic__video-bg">
      <img
        src={fallbackImage}
        alt=""
        className="hero-cinematic__layer hero-cinematic__layer--base"
        decoding="async"
      />
      <img
        src={heroPoster}
        alt=""
        className={`hero-cinematic__layer hero-cinematic__layer--match${
          mp4Ready ? ' hero-cinematic__layer--hidden' : ''
        }`}
        decoding="async"
      />

      {!allFailed && currentSource && (
        <video
          key={currentSource.src}
          className={`hero-cinematic__layer hero-cinematic__layer--mp4${
            mp4Ready ? ' hero-cinematic__layer--visible' : ''
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          onCanPlay={() => setMp4Ready(true)}
          onLoadedData={() => setMp4Ready(true)}
          onError={tryNextSource}
        >
          <source src={currentSource.src} type={currentSource.type} />
        </video>
      )}
    </div>
  );
}
