export type GalleryItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  span: 'big' | 'tall' | 'wide' | 'normal';
  poster?: string;
};

export const gallery: GalleryItem[] = [
  {
    type: 'image',
    src: '/images/PHOTO-2024-11-07-21-38-48.webp',
    alt: "Éclairage d'ambiance violet sur tableau de bord Mercedes Classe A",
    span: 'normal',
  },
  {
    type: 'video',
    src: '/videos/VIDEO-2024-05-15-16-35-32.mp4',
    poster: '/images/PHOTO-2024-11-07-21-38-48.webp',
    alt: "Éclairage d'ambiance vert sur tableau de bord Mercedes, en conduite",
    span: 'wide',
  },
  {
    type: 'image',
    src: '/images/PHOTO-2024-11-07-21-41-57-2.webp',
    alt: "Éclairage d'ambiance vert et violet, intérieur Volkswagen Golf",
    span: 'tall',
  },
  {
    type: 'image',
    src: '/images/PHOTO-2024-11-07-21-41-57.webp',
    alt: "Éclairage d'ambiance violet et rouge, intérieur Volkswagen Golf",
    span: 'normal',
  },
  {
    type: 'video',
    src: '/videos/VIDEO-2024-05-15-16-35-28.mp4',
    alt: "Éclairage d'ambiance rose sur volant sport",
    span: 'normal',
  },
  {
    type: 'video',
    src: '/videos/VIDEO-2024-05-15-16-35-39.mp4',
    alt: 'Présentation Audi Q2 après installation, garage Mlightning',
    span: 'normal',
  },
  {
    type: 'video',
    src: '/videos/videoPlayer.mp4',
    alt: "Éclairage d'ambiance sur mesure, aperçu vidéo",
    span: 'tall',
  },
];
