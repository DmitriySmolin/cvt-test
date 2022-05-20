import {
  ADD_CHARACTERS_TO_FAVORITE,
  CHARACTERS_ERROR,
  CHARACTERS_LOAD,
  CHARACTERS_REQUEST,
  FAVORITE_CHARACTERS_LOCAL_STORAGE_LOAD,
  FILTER_FAVORITE_CHARACTERS,
  REMOVE_CHARACTERS_FROM_FAVORITE,
  SET_QUANTITY_PAGES,
  SELECTED_PAGE_CHARACTERS,
} from '../action-types/action-types';

const initialState = {
  characters: [],
  favoriteCharacters: [],
  quantityPages: null,
  selectPage: 0,
  loading: true,
  error: null,
};

const charactersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHARACTERS_REQUEST:
      return {
        ...state,
        characters: [],
        loading: true,
        error: null,
      };
    case CHARACTERS_LOAD:
      return {
        ...state,
        characters: payload,
        loading: false,
        error: null,
      };
    case SET_QUANTITY_PAGES:
      return {
        ...state,
        quantityPages: payload,
      };
    case SELECTED_PAGE_CHARACTERS:
      return {
        ...state,
        selectPageCharacters: payload,
      };
    case ADD_CHARACTERS_TO_FAVORITE:
      return {
        ...state,
        favoriteCharacters: [...state.favoriteCharacters, payload],
        loading: false,
        error: null,
      };
    case REMOVE_CHARACTERS_FROM_FAVORITE:
      return {
        ...state,
        favoriteCharacters: payload,
      };
    case FILTER_FAVORITE_CHARACTERS:
      return {
        ...state,
        favoriteCharacters: payload,
      };
    case FAVORITE_CHARACTERS_LOCAL_STORAGE_LOAD:
      return {
        ...state,
        favoriteCharacters: payload,
        loading: false,
        error: null,
      };
    case CHARACTERS_ERROR:
      return {
        characters: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default charactersReducer;
