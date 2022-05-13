export default class RickandmortyService {
  _baseURL = 'https://rickandmortyapi.com/api/';

  getResource = async (url) => {
    const res = await fetch(this._baseURL + url);
    if (!res.ok) {
       throw new Error(`Could not fetch ${url}` + `received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };

  addPropertyFavorite = (item) => {
    return {
      ...item,
      isFavorite: false
    };
  };

  getAllCharacters = async (name = '', species = '', status = '', currentPage = '') => {
    if (status === 'Выберите статус персонажа') {
      status = '';
    }
    const res = await this.getResource(`character/?page=${currentPage}&name=${name}&species=${species}&status=${status}`);
    const characters = res.results.map(item => this.addPropertyFavorite(item));

    return {characters, info: res.info};
  };

}

