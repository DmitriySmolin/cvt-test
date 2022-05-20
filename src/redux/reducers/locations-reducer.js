import {
  ADD_LOCATIONS_TO_FAVORITE,
  FAVORITE_LOCATIONS_LOCAL_STORAGE_LOAD,
  FILTER_FAVORITE_LOCATIONS,
  LOCATIONS_ERROR,
  LOCATIONS_LOAD,
  LOCATIONS_REQUEST,
  REMOVE_LOCATIONS_FROM_FAVORITE,
  SET_QUANTITY_PAGES,
  SELECTED_PAGE_LOCATIONS,
} from '../action-types/action-types';

const initialState = {
  locations: [],
  favoriteLocations: [],
  quantityPages: null,
  selectPage: 0,
  loading: true,
  error: null,
};

const locationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOCATIONS_REQUEST:
      return {
        ...state,
        locations: [],
        loading: true,
        error: null,
      };
    case LOCATIONS_LOAD:
      return {
        ...state,
        locations: payload,
        loading: false,
        error: null,
      };
    case SET_QUANTITY_PAGES:
      return {
        ...state,
        quantityPages: payload,
      };
    case SELECTED_PAGE_LOCATIONS:
      return {
        ...state,
        selectPage: payload,
      };
    case ADD_LOCATIONS_TO_FAVORITE:
      return {
        ...state,
        favoriteLocations: [...state.favoriteLocations, payload],
        loading: false,
        error: null,
      };
    case REMOVE_LOCATIONS_FROM_FAVORITE:
      return {
        ...state,
        favoriteLocations: payload,
      };
    case FILTER_FAVORITE_LOCATIONS:
      return {
        ...state,
        favoriteLocations: payload,
      };
    case FAVORITE_LOCATIONS_LOCAL_STORAGE_LOAD:
      return {
        ...state,
        favoriteLocations: payload,
        loading: false,
        error: null,
      };
    case LOCATIONS_ERROR:
      return {
        locations: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;
