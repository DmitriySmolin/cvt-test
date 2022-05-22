import React from 'react';
import FavoriteCharactersListItem from './favorite-characters-list-item';
import dotGreen from '../../assets/icons/dot-green.svg';
import dotRed from '../../assets/icons/dot-red.svg';
import dotYellow from '../../assets/icons/dot-yellow.svg';
import {sortArray} from '../../helpers/helpers';

class FavoriteCharactersList extends React.Component {
  state = {
    filterCharacters: null,
  };

  componentDidMount() {
    this.setState({filterCharacters: localStorage.getItem('filterCharacters')});
  }

  choiceStatusCharacter = (status) => {
    return status === 'Alive' ? dotGreen : status === 'Dead' ? dotRed : status === 'unknown' ? dotYellow : '';
  };

  removeFromFavoriteHandler = (id) => {
    const {favoriteCharacters, removeFromFavorite} = this.props;

    let filteredFavoriteCharacters = favoriteCharacters.filter((character) => character.id !== id);

    removeFromFavorite(filteredFavoriteCharacters);
  };

  filterFavoriteCharactersHandler = (key, key2) => {
    this.setState({filterCharacters: key});
    localStorage.setItem('filterCharacters', key);

    const filteredFavoriteCharacters = this.props.favoriteCharacters.sort(sortArray(key, key2));
    this.props.filterFavorite(filteredFavoriteCharacters);
    this.props.favoriteCharactersLocalStorageLoad();
  };

  render() {
    const {favoriteCharacters} = this.props;

    if (favoriteCharacters.length === 0) {
      return (
        <div className="title-no-favorites d-flex justify-content-center align-items-center px-2 mb-4 ">
          У вас пока нет избранных персонажей
        </div>
      );
    }

    return (
      <>
        <div className="sort-block d-flex flex-column flex-md-row align-items-center mt-5 px-2 mb-4 ">
          <div className="sort-text px-2" onClick={() => this.filterFavoriteCharactersHandler('id')}>
            Сортировать:
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterCharacters === 'name' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteCharactersHandler('name')}
          >
            по имени
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterCharacters === 'origin' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteCharactersHandler('origin', 'name')}
          >
            по месту происхождения
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterCharacters === 'location' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteCharactersHandler('location', 'name')}
          >
            по последней локации
          </div>
        </div>
        <div className="row row-cols-md-4 col-md-12">
          {favoriteCharacters.map((character) => {
            const {...itemProps} = character;
            return (
              <FavoriteCharactersListItem
                key={character.id}
                {...itemProps}
                choiceStatusCharacter={this.choiceStatusCharacter}
                removeFromFavoriteHandler={this.removeFromFavoriteHandler}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default FavoriteCharactersList;
