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

  getAllCharacters = async () => {
    const res = await this.getResource('character');
    return res.results;
  };


}

