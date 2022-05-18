const actionLocationsRequest = () => {
  return {
    type: 'LOCATIONS_REQUEST'
  };
};

const actionLocationsLoad = (newLocations) => {
  return {
    type: 'LOCATIONS_LOAD',
    payload: newLocations
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

const actionAddToFavorite = (locations, location) => {

  const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
  localStorage.setItem('favoriteLocations', JSON.stringify([...favoriteLocations, location]));

  return {
    type: 'ADD_TO_FAVORITE',
    payload: location
  };
};

const actionRemoveFromFavorite = (favoriteLocations) => {

  localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteLocations'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteLocations');

  return {
    type: 'REMOVE_FROM_FAVORITE',
    payload: favoriteLocations
  };
};

const actionFilterFavorite = (favoriteLocations) => {

  localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));

  return {
    type: 'FILTER_FAVORITE_LOCATIONS',
    payload: favoriteLocations
  };
};

const actionFavoriteLocationsLocalStorageLoad = () => {

  const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];

  return {
    type: 'FAVORITE_LOCATIONS_LOCAL_STORAGE_LOAD',
    payload: favoriteLocations
  };
};

const actionLocationsError = (error) => {
  return {
    type: 'LOCATIONS_ERROR',
    payload: error
  };
};

export {
  actionLocationsRequest,
  actionLocationsLoad,
  actionSetQuantityPages,
  actionSetSelectedPage,
  actionAddToFavorite,
  actionRemoveFromFavorite,
  actionFilterFavorite,
  actionFavoriteLocationsLocalStorageLoad,
  actionLocationsError
};
