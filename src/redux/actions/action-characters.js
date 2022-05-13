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

const actionAddToFavorite = (characters, char) => {

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
  localStorage.setItem('favoriteCharacters', JSON.stringify([...favoriteCharacters, char]));

  return {
    type: 'ADD_TO_FAVORITE',
    payload: char
  };
};

const actionFavoriteCharactersLoad = () => {

  const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];

  return {
    type: 'CHARACTERS_FAVORITE_LOAD',
    payload: favoriteCharacters
  };
};

const actionCharactersError = (error) => {
  return {
    type: 'CHARACTERS_ERROR',
    payload: error
  };
};

export {actionCharactersRequest, actionCharactersLoad, actionAddToFavorite, actionFavoriteCharactersLoad,actionCharactersError};
