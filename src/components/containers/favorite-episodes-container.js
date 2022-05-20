import React from 'react';
import { connect } from 'react-redux';
import {
  actionFavoriteEpisodesLocalStorageLoad,
  actionFilterFavorite,
  actionRemoveFromFavorite,
  actionSetEpisodeCharacters,
} from '../../redux/actions/action-episodes';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import compose from '../../utils';
import FavoriteEpisodesList from '../favorite-episodes-list';
import { withRickandmortyService } from '../hoc';

class FavoriteEpisodesContainer extends React.Component {
  async componentDidMount() {
    const favoriteEpisodes = this.props.favoriteEpisodesLocalStorageLoad();

    const episodeCharacters = await this.props.rickandmortyService.getEpisodeCharacters(favoriteEpisodes);
    this.props.setEpisodeCharacters(episodeCharacters);
  }

  render() {
    return (
      <FavoriteEpisodesList
        favoriteEpisodes={this.props.favoriteEpisodes}
        episodeCharacters={this.props.episodeCharacters}
        removeFromFavorite={this.props.removeFromFavorite}
        filterFavorite={this.props.filterFavorite}
        favoriteEpisodesLocalStorageLoad={this.props.favoriteEpisodesLocalStorageLoad}
      />
    );
  }
}

const mapStateToProps = ({ episodesList }) => {
  return {
    favoriteEpisodes: episodesList.favoriteEpisodes,
    episodeCharacters: episodesList.episodeCharacters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      favoriteEpisodesLocalStorageLoad: () => actionFavoriteEpisodesLocalStorageLoad(),
      setEpisodeCharacters: (episodeCharacters) => actionSetEpisodeCharacters(episodeCharacters),
      removeFromFavorite: (favoriteEpisodes) => actionRemoveFromFavorite(favoriteEpisodes),
      filterFavorite: (favoriteEpisodes) => actionFilterFavorite(favoriteEpisodes),
    },
    dispatch
  );
};

export default compose(
  withRickandmortyService(),
  connect(mapStateToProps, mapDispatchToProps)
)(FavoriteEpisodesContainer);
