import React from 'react';
import FavoriteEpisodesListItem from './favorite-episodes-list-item';
import { sortArray } from '../../helpers/helpers';

class FavoriteEpisodesList extends React.Component {
  state = {
    filterEpisodes: null,
  };

  componentDidMount() {
    this.setState({ filterEpisodes: localStorage.getItem('filterEpisodes') });
  }

  removeFromFavoriteHandler = (id) => {
    const { favoriteEpisodes, removeFromFavorite } = this.props;

    let filteredFavoriteEpisodes = favoriteEpisodes.filter((episode) => episode.id !== id);

    removeFromFavorite(filteredFavoriteEpisodes);
  };

  filterFavoriteEpisodesHandler = (key) => {
    this.setState({ filterEpisodes: key });
    localStorage.setItem('filterEpisodes', key);

    const filteredFavoriteEpisodes = this.props.favoriteEpisodes.sort(sortArray(key));
    this.props.filterFavorite(filteredFavoriteEpisodes);
    this.props.favoriteEpisodesLocalStorageLoad();
  };

  render() {
    const { favoriteEpisodes } = this.props;

    if (favoriteEpisodes.length === 0) {
      return (
        <div className="title-no-favorites d-flex justify-content-center align-items-center px-2 mb-4 ">
          У вас пока нет избранных эпизодов
        </div>
      );
    }

    return (
      <>
        <div className="sort-block d-flex flex-column flex-md-row align-items-center mt-5 px-2 mb-4 ">
          <div className="sort-text px-2" onClick={() => this.filterFavoriteEpisodesHandler('id')}>
            Сортировать:
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterEpisodes === 'name' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteEpisodesHandler('name')}
          >
            по названию
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterEpisodes === 'episode' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteEpisodesHandler('episode')}
          >
            по эпизоду
          </div>
        </div>
        <div className="row row-cols-md-4 col-md-12">
          {favoriteEpisodes.map((episode, index) => {
            const { ...itemProps } = episode;
            return (
              <FavoriteEpisodesListItem
                key={episode.id}
                episodeCharacters={this.props.episodeCharacters && this.props.episodeCharacters[index]}
                {...itemProps}
                removeFromFavoriteHandler={this.removeFromFavoriteHandler}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default FavoriteEpisodesList;
