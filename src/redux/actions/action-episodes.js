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

const actionSetCurrentPage = (currentPage) => {
  return {
    type: 'SET_CURRENT_PAGE',
    payload: currentPage
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
  actionSetCurrentPage,
  actionAddToFavorite,
  actionFavoriteEpisodesLocalStorageLoad,
  actionSetEpisodeCharacters,
  actionEpisodesError
};
