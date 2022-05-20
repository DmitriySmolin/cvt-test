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
      isFavorite: false,
    };
  };

  getAllCharacters = async (name = '', species = '', status = '', currentPage = '') => {
    if (status === 'Выберите статус персонажа') {
      status = '';
    }
    const res = await this.getResource(
      `character/?page=${currentPage}&name=${name}&species=${species}&status=${status}`
    );
    const characters = res.results.map((item) => this.addPropertyFavorite(item));

    return { characters, info: res.info };
  };

  getAllLocations = async (name = '', type = '', dimension = '', currentPage = '') => {
    const res = await this.getResource(
      `location/?page=${currentPage}&name=${name}&type=${type}&dimension=${dimension}`
    );
    const locations = res.results.map((item) => this.addPropertyFavorite(item));

    return { locations, info: res.info };
  };

  getAllEpisodes = async (name = '', episode = '', currentPage = '') => {
    const res = await this.getResource(`episode/?page=${currentPage}&name=${name}&episode=${episode}`);

    const episodes = res.results.map((item) => this.addPropertyFavorite(item));

    return { episodes, info: res.info };
  };

  getAllCharactersInOneEpisode = async (id) => {
    const data = await this.getResource(`episode/${id}`);

    return await Promise.all(
      data.characters.map((x, i) => {
        return fetch(x).then((res) => res.json());
      })
    );
  };

  getEpisodeCharacters = async (episodes = null, name = '', episode = '', currentPage = '') => {
    let res;

    if (episodes) {
      res = episodes.payload;
    } else {
      res = await this.getResource(`episode/?page=${currentPage}&name=${name}&episode=${episode}`);
      res = res.results;
    }

    const episodesId = res.map((item) => item.id);

    const arrayPromises = episodesId.map((id) => this.getAllCharactersInOneEpisode(id));

    const episodeCharacters = await Promise.all(arrayPromises).then((values) => {
      return values;
    });

    return episodeCharacters;
  };
}
