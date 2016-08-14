export function loadPhotos(offset=0, limit=10) {
  return {
    meta: {remote: true},
    type: 'LOAD_PHOTOS',
    offset, limit
  }
}
