const initialState = {
  characters: [],
  favoriteCharacters: [],
  loading: true,
  error: null
};

const charactersReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CHARACTERS_REQUEST':
      return {
        ...state,
        characters: [],
        loading: true,
        error: null
      };
    case 'CHARACTERS_LOAD':
      return {
        ...state,
        characters: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favoriteCharacters: [...state.favoriteCharacters, action.payload],
        loading: false,
        error: null
      };
    case 'CHARACTERS_FAVORITE_LOAD':
      return {
        ...state,
        favoriteCharacters: action.payload,
        loading: false,
        error: null,
      };
    case 'CHARACTERS_ERROR':
      return {
        characters: [],
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default charactersReducer;
