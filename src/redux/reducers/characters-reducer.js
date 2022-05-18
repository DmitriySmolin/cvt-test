const initialState = {
  characters: [],
  favoriteCharacters: [],
  quantityPages: null,
  selectPage: 0,
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
    case 'SET_QUANTITY_PAGES':
      return {
        ...state,
        quantityPages: action.payload
      };
    case 'SET_SELECTED_PAGE':
      return {
        ...state,
        selectPage: action.payload
      };
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favoriteCharacters: [...state.favoriteCharacters, action.payload],
        loading: false,
        error: null
      };
    case 'REMOVE_FROM_FAVORITE':
      return {
        ...state,
        favoriteCharacters: action.payload
      };
    case 'FILTER_FAVORITE_LOCATIONS':
      return {
        ...state,
        favoriteCharacters: action.payload
      };
    case 'CHARACTERS_FAVORITE_LOCAL_STORAGE_LOAD':
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
