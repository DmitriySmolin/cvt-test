const actionEpisodesRequest = () => {
  return {
    type: 'EPISODES_REQUEST'
  };
};

const actionEpisodesLoad = (newEpisodes) => {
  return {
    type: 'EPISODES_LOAD',
    payload: newEpisodes
  };
};

const actionSetQuantityPages = (quantityPages) => {
  return {
    type: 'SET_QUANTITY_PAGES',
    payload: quantityPages
  };
};

const actionSetSelectedPage = (selectPage) => {
  return {
    type: 'SET_SELECTED_PAGE',
    payload: selectPage
  };
};

const actionAddToFavorite = (episodes, episode) => {

  const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  localStorage.setItem('favoriteEpisodes', JSON.stringify([...favoriteEpisodes, episode]));

  return {
    type: 'ADD_TO_FAVORITE',
    payload: episode
  };
};

const actionRemoveFromFavorite = (favoriteEpisodes) => {

  localStorage.setItem('favoriteEpisodes', JSON.stringify(favoriteEpisodes));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteEpisodes'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteEpisodes');

  return {
    type: 'REMOVE_FROM_FAVORITE',
    payload: favoriteEpisodes
  };
};

const actionFilterFavorite = (favoriteEpisodes) => {

  localStorage.setItem('favoriteEpisodes', JSON.stringify(favoriteEpisodes));

  return {
    type: 'FILTER_FAVORITE_EPISODES',
    payload: favoriteEpisodes
  };
};

const actionFavoriteEpisodesLocalStorageLoad = () => {

  const favoriteEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

  return {
    type: 'FAVORITE_EPISODES_LOCAL_STORAGE_LOAD',
    payload: favoriteEpisodes
  };
};

const actionSetEpisodeCharacters = (episodeCharacters) => {
  return {
    type: 'SET_EPISODES_CHARACTERS',
    payload: episodeCharacters
  };
};

const actionEpisodesError = (error) => {
  return {
    type: 'EPISODES_ERROR',
    payload: error
  };
};

export {
  actionEpisodesRequest,
  actionEpisodesLoad,
  actionSetQuantityPages,
  actionSetSelectedPage,
  actionAddToFavorite,
  actionRemoveFromFavorite,
  actionFilterFavorite,
  actionFavoriteEpisodesLocalStorageLoad,
  actionSetEpisodeCharacters,
  actionEpisodesError
};
