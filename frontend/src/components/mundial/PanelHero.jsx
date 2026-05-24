import MediaImage from '../ui/MediaImage';
import { MUNDIAL_SECTION_IMAGES } from '../../data/siteImages';

export default function PanelHero({ section }) {
  const img = MUNDIAL_SECTION_IMAGES[section];
  if (!img) return null;

  return (
    <MediaImage
      src={img.src}
      alt={img.alt}
      aspect="wide"
      className="mundial-panel-hero"
    />
  );
}
