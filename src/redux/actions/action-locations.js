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

export const actionLocationsRequest = () => {
  return {
    type: LOCATIONS_REQUEST,
  };
};

export const actionLocationsLoad = (newLocations) => {
  return {
    type: LOCATIONS_LOAD,
    payload: newLocations,
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
    type: SELECTED_PAGE_LOCATIONS,
    payload: selectPage,
  };
};

export const actionAddToFavorite = (locations, location) => {
  const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
  localStorage.setItem('favoriteLocations', JSON.stringify([...favoriteLocations, location]));

  return {
    type: ADD_LOCATIONS_TO_FAVORITE,
    payload: location,
  };
};

export const actionRemoveFromFavorite = (favoriteLocations) => {
  localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteLocations'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteLocations');

  return {
    type: REMOVE_LOCATIONS_FROM_FAVORITE,
    payload: favoriteLocations,
  };
};

export const actionFilterFavorite = (favoriteLocations) => {
  localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));

  return {
    type: FILTER_FAVORITE_LOCATIONS,
    payload: favoriteLocations,
  };
};

export const actionFavoriteLocationsLocalStorageLoad = () => {
  const favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];

  return {
    type: FAVORITE_LOCATIONS_LOCAL_STORAGE_LOAD,
    payload: favoriteLocations,
  };
};

export const actionLocationsError = (error) => {
  return {
    type: LOCATIONS_ERROR,
    payload: error,
  };
};
