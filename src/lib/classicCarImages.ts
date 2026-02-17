// Rotating hero backgrounds — curated classic car images (Unsplash)
export const CLASSIC_CAR_IMAGES = [
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c6c5104b8?w=1920&q=80",
  "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=1920&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=80",
];

export const getRandomCarImage = () => {
  return CLASSIC_CAR_IMAGES[Math.floor(Math.random() * CLASSIC_CAR_IMAGES.length)];
};
