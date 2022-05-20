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

export const actionEpisodesRequest = () => {
  return {
    type: EPISODES_REQUEST,
  };
};

export const actionEpisodesLoad = (newEpisodes) => {
  return {
    type: EPISODES_LOAD,
    payload: newEpisodes,
  };
};

export const actionSetQuantityPages = (quantityPages) => {
  return {
    type: SET_QUANTITY_PAGES,
    payload: quantityPages,
  };
};

export const actionSetSelectedPage = (selectPage) => {
  return {
    type: SELECTED_PAGE_EPISODES,
    payload: selectPage,
  };
};

export const actionAddToFavorite = (episodes, episode) => {
  const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  localStorage.setItem('favoriteEpisodes', JSON.stringify([...favoriteEpisodes, episode]));

  return {
    type: ADD_EPISODES_TO_FAVORITE,
    payload: episode,
  };
};

export const actionRemoveFromFavorite = (favoriteEpisodes) => {
  localStorage.setItem('favoriteEpisodes', JSON.stringify(favoriteEpisodes));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteEpisodes'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteEpisodes');

  return {
    type: REMOVE_EPISODES_FROM_FAVORITE,
    payload: favoriteEpisodes,
  };
};

export const actionFilterFavorite = (favoriteEpisodes) => {
  localStorage.setItem('favoriteEpisodes', JSON.stringify(favoriteEpisodes));

  return {
    type: FILTER_FAVORITE_EPISODES,
    payload: favoriteEpisodes,
  };
};

export const actionFavoriteEpisodesLocalStorageLoad = () => {
  const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

  return {
    type: FAVORITE_EPISODES_LOCAL_STORAGE_LOAD,
    payload: favoriteEpisodes,
  };
};

export const actionSetEpisodeCharacters = (episodeCharacters) => {
  return {
    type: SET_EPISODES_CHARACTERS,
    payload: episodeCharacters,
  };
};

export const actionEpisodesError = (error) => {
  return {
    type: EPISODES_ERROR,
    payload: error,
  };
};
