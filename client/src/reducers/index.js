export function viewer(state = {}, action) {
  switch (action.type) {
    case 'SET_PHOTOS': {
      return {
        photos: action.photos,
        page: 0
      }
    }
  }
  return state;
}
