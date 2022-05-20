import {
  ADD_EPISODES_TO_FAVORITE,
  EPISODES_ERROR,
  EPISODES_LOAD,
  EPISODES_REQUEST,
  FAVORITE_EPISODES_LOCAL_STORAGE_LOAD,
  FILTER_FAVORITE_EPISODES,
  REMOVE_EPISODES_FROM_FAVORITE,
  SET_EPISODES_CHARACTERS,
  SET_QUANTITY_PAGES,
  SELECTED_PAGE_EPISODES,
} from '../action-types/action-types';

const initialState = {
  episodes: [],
  favoriteEpisodes: [],
  episodeEpisodes: [],
  quantityPages: null,
  selectPage: 0,
  loading: true,
  error: null,
};

const episodesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EPISODES_REQUEST:
      return {
        ...state,
        episodes: [],
        loading: true,
        error: null,
      };
    case EPISODES_LOAD:
      return {
        ...state,
        episodes: payload,
        loading: false,
        error: null,
      };
    case SET_QUANTITY_PAGES:
      return {
        ...state,
        quantityPages: payload,
      };
    case SELECTED_PAGE_EPISODES:
      return {
        ...state,
        selectPage: payload,
      };
    case ADD_EPISODES_TO_FAVORITE:
      return {
        ...state,
        favoriteEpisodes: [...state.favoriteEpisodes, payload],
        loading: false,
        error: null,
      };
    case REMOVE_EPISODES_FROM_FAVORITE:
      return {
        ...state,
        favoriteEpisodes: payload,
      };
    case FILTER_FAVORITE_EPISODES:
      return {
        ...state,
        favoriteEpisodes: payload,
      };
    case FAVORITE_EPISODES_LOCAL_STORAGE_LOAD:
      return {
        ...state,
        favoriteEpisodes: payload,
        loading: false,
        error: null,
      };
    case SET_EPISODES_CHARACTERS:
      return {
        ...state,
        episodeCharacters: payload,
        loading: false,
        error: null,
      };
    case EPISODES_ERROR:
      return {
        episodes: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default episodesReducer;
