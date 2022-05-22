import React from 'react';
import { connect } from 'react-redux';
import {
  actionFavoriteCharactersLocalStorageLoad,
  actionFilterFavorite,
  actionRemoveFromFavorite,
} from '../../redux/actions/action-characters';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import compose from '../../utils';
import FavoriteCharactersList from '../favorite-characters-list/favorite-characters-list';

class FavoriteCharactersContainer extends React.Component {

  componentDidMount() {

    this.props.favoriteCharactersLocalStorageLoad();
  }

  render() {
    return (
      <FavoriteCharactersList
        favoriteCharacters={this.props.favoriteCharacters}
        removeFromFavorite={this.props.removeFromFavorite}
        filterFavorite={this.props.filterFavorite}
        favoriteCharactersLocalStorageLoad={this.props.favoriteCharactersLocalStorageLoad}
      />
    );
  }
}

const mapStateToProps = ({ charactersList }) => {
  return {
    favoriteCharacters: charactersList.favoriteCharacters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      favoriteCharactersLocalStorageLoad: () => actionFavoriteCharactersLocalStorageLoad(),
      removeFromFavorite: (favoriteCharacters) => actionRemoveFromFavorite(favoriteCharacters),
      filterFavorite: (favoriteCharacters) => actionFilterFavorite(favoriteCharacters),
    },
    dispatch
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FavoriteCharactersContainer);
