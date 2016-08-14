export function viewer(state = {}, action) {
  switch (action.type) {
    case 'PUSH_PHOTOS': {
      return {
        photos: [...state.photos || [], ...action.photos],
        offset: action.offset,
        limit: action.limit
      }
    }
  }
  return state;
}
