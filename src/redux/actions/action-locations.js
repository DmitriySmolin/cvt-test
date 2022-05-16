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

const actionAddToFavorite = (locations, location) => {

  const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
  localStorage.setItem('favoriteLocations', JSON.stringify([...favoriteLocations, location]));

  return {
    type: 'ADD_TO_FAVORITE',
    payload: location
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
  actionAddToFavorite,
  actionFavoriteLocationsLocalStorageLoad,
  actionLocationsError
};
