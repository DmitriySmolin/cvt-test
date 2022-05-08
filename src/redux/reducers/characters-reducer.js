const initialState = {
  characters: []
};

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHARACTERS_LOADED':
      return {
        ...state,
        characters: action.payload
      };
    default:
      return state;
  }
};

export default charactersReducer;
