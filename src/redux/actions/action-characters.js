const actionCharactersRequest = () => {
  return {
    type: 'CHARACTERS_REQUEST'
  };
};

const actionCharactersLoad = (newCharacters) => {
  return {
    type: 'CHARACTERS_LOAD',
    payload: newCharacters
  };
};

const actionSetQuantityPages = (quantityPages) => {
  return {
    type: 'SET_QUANTITY_PAGES',
    payload: quantityPages
  };
};

const actionAddToFavorite = (characters, char) => {

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  localStorage.setItem('favoriteCharacters', JSON.stringify([...favoriteCharacters, char]));

  return {
    type: 'ADD_TO_FAVORITE',
    payload: char
  };
};

const actionFavoriteCharactersLocalStorageLoad = () => {

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];

  return {
    type: 'CHARACTERS_FAVORITE_LOCAL_STORAGE_LOAD',
    payload: favoriteCharacters
  };
};

const actionRemoveFromFavorite = (favoriteCharacters) => {

  localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));

  let itemsLocalStorage = JSON.parse(localStorage.getItem('favoriteCharacters'));

  if (itemsLocalStorage.length === 0) localStorage.removeItem('favoriteCharacters');

  return {
    type: 'REMOVE_FROM_FAVORITE',
    payload: favoriteCharacters
  };
};

const actionFilterFavorite = (favoriteCharacters) => {

  localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));

  return {
    type: 'FILTER_FAVORITE_LOCATIONS',
    payload: favoriteCharacters
  };
};

const actionCharactersError = (error) => {
  return {
    type: 'CHARACTERS_ERROR',
    payload: error
  };
};

export {
  actionCharactersRequest,
  actionCharactersLoad,
  actionSetQuantityPages,
  actionAddToFavorite,
  actionRemoveFromFavorite,
  actionFilterFavorite,
  actionFavoriteCharactersLocalStorageLoad,
  actionCharactersError
};
