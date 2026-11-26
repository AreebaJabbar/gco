export const dynamic = 'force-dynamic';

import PageHero from '@/components/PageHero';
import GalleryView from '@/components/GalleryView';
import { DEFAULT_GALLERY_IMAGES } from '@/lib/gallery';

export const metadata = {
  title: 'Gallery | GCO Foundation Pakistan',
  description:
    'Explore our photo gallery documenting our Church ministry, Fullness Reformed Institute, Orphanage care, and Education initiatives across Pakistan.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Gallery"
        subtitle="Moments of love, hope, and transformation across our communities in Pakistan."
        crumb="Gallery"
        bgImage="/assets/hero-home-bg.jpg"
        bgAlt="Global Connection Welfare Organization - Gallery and Activities"
        bgPosition="center 30%"
      />

      <GalleryView initialImages={DEFAULT_GALLERY_IMAGES} />
    </>
  );
}
