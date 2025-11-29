export function getImageSrc(posterImage: string) {
  return posterImage.replace(/.*\/static\/images/, '');
}
