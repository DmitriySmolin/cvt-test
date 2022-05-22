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

export const actionCharactersRequest = () => {
  return {
    type: CHARACTERS_REQUEST,
  };
};

export const actionCharactersLoad = (newCharacters) => {
  return {
    type: CHARACTERS_LOAD,
    payload: newCharacters,
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
    type: SELECTED_PAGE_CHARACTERS,
    payload: selectPage,
  };
};

export const actionAddToFavorite = (characters, char) => {
  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  localStorage.setItem('favoriteCharacters', JSON.stringify([...favoriteCharacters, char]));

  return {
    type: ADD_CHARACTERS_TO_FAVORITE,
    payload: char,
  };
};

export const actionFavoriteCharactersLocalStorageLoad = () => {

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];

  return {
    type: FAVORITE_CHARACTERS_LOCAL_STORAGE_LOAD,
    payload: favoriteCharacters,
  };
};

export const actionRemoveFromFavorite = (favoriteCharacters) => {
  localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteCharacters'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteCharacters');

  return {
    type: REMOVE_CHARACTERS_FROM_FAVORITE,
    payload: favoriteCharacters,
  };
};

export const actionFilterFavorite = (favoriteCharacters) => {
  localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));

  return {
    type: FILTER_FAVORITE_CHARACTERS,
    payload: favoriteCharacters,
  };
};

export const actionCharactersError = (error) => {
  return {
    type: CHARACTERS_ERROR,
    payload: error,
  };
};
