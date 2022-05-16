import React from 'react';
import {connect} from 'react-redux';
import withRickandmortyService from '../hoc';
import Spinner from '../spinner/spinner';
import {
  actionAddToFavorite,
  actionEpisodesError,
  actionEpisodesLoad,
  actionEpisodesRequest,
  actionFavoriteEpisodesLocalStorageLoad, actionSetCurrentPage, actionSetEpisodeCharacters,
  actionSetQuantityPages
} from '../../redux/actions/action-episodes';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';
import EpisodesList from '../episodes-list';


class EpisodesListContainer extends React.Component {

  async componentDidMount() {

    const {
      rickandmortyService,
      episodesRequest,
      episodesLoad,
      setQuantityPages,
      favoriteEpisodesLocalStorageLoad,
      setEpisodeCharacters,
      episodesError,
    } = this.props;

    episodesRequest();

    try {
      const res = await rickandmortyService.getAllEpisodes();
      const episodeCharacters = await rickandmortyService.getEpisodeCharacters();
      setEpisodeCharacters(episodeCharacters);

      setQuantityPages(res.info.pages);
      favoriteEpisodesLocalStorageLoad();
      episodesLoad(this.isCheckFavorite(this.props.favoriteEpisodes, res.episodes));

    } catch (error) {
      episodesError(error);
    }

  }

  isCheckFavorite = (oldItems = [], newItems = []) => {

    if (oldItems.length === 0) return newItems;

    oldItems.forEach((oldItem) => {
      newItems.forEach((newItem) => {
        if (oldItem.id === newItem.id) {
          newItem.isFavorite = true;
        }
      });
    });

    return newItems;

  };

  filter = async (name, episode, currentPage) => {
    const {rickandmortyService, favoriteEpisodes, setQuantityPages, setEpisodeCharacters} = this.props;

    const res = await rickandmortyService.getAllEpisodes(name, episode, currentPage);

    this.props.episodesRequest();
    this.props.setCurrentPage(currentPage - 1);

    const episodeCharacters = await rickandmortyService.getEpisodeCharacters(name, episode, currentPage);
    setEpisodeCharacters(episodeCharacters);

    setQuantityPages(res.info.pages);
    return this.isCheckFavorite(favoriteEpisodes, res.episodes);
  };

  handlePageClick = (data, name, episode) => {

    const {episodesLoad, favoriteEpisodes, episodesRequest, setCurrentPage} = this.props;

    episodesRequest();

    let numberPage = data.selected + 1;
    setCurrentPage(numberPage - 1);

    this.filter(name.value, episode.value, numberPage).then(items => {
      episodesLoad(items);
      this.isCheckFavorite(favoriteEpisodes, items);
    });

  };

  render() {

    const {loading, error} = this.props;

    if (loading) {
      return <Spinner/>;
    }

    if (error) {
      return <ErrorIndicator/>;
    }

    return (
      <EpisodesList episodes={this.props.episodes}
                    episodeCharacters={this.props.episodeCharacters}
                    quantityPages={this.props.quantityPages}
                    currentPage={this.props.currentPage}
                    handlePageClick={this.handlePageClick}
                    addToFavorite={this.props.addToFavorite}
                    episodesLoad={this.props.episodesLoad}
                    filter={this.filter}
                    isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = ({episodesList, auth}) => {
  return {
    episodes: episodesList.episodes,
    episodeCharacters: episodesList.episodeCharacters,
    quantityPages: episodesList.quantityPages,
    currentPage: episodesList.currentPage,
    favoriteEpisodes: episodesList.favoriteEpisodes,
    loading: episodesList.loading,
    error: episodesList.error,
    isAuth: !!auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    episodesRequest: () => actionEpisodesRequest(),
    episodesLoad: (newEpisodes) => actionEpisodesLoad(newEpisodes),
    setEpisodeCharacters: (episodeCharacters) => actionSetEpisodeCharacters(episodeCharacters),
    favoriteEpisodesLocalStorageLoad: () => actionFavoriteEpisodesLocalStorageLoad(),
    setQuantityPages: (quantityPages) => actionSetQuantityPages(quantityPages),
    setCurrentPage: (currentPage) => actionSetCurrentPage(currentPage),
    addToFavorite: (episodes, episode) => actionAddToFavorite(episodes, episode),
    episodesError: (error) => actionEpisodesError(error),
  }, dispatch);
};

export default compose(
  withRickandmortyService(),
  connect(mapStateToProps, mapDispatchToProps)
)(EpisodesListContainer);

