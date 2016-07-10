export function viewer(state = {}, action) {
  switch (action.type) {
    case 'SET_PHOTOS': {
      return {
        photos: action.photos
      }
    }
  }
  return state;
}
