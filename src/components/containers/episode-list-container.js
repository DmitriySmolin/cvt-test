import React from 'react';
import { connect } from 'react-redux';
import { withRickandmortyService } from '../hoc';
import Spinner from '../spinner/spinner';
import {
  actionAddToFavorite,
  actionEpisodesError,
  actionEpisodesLoad,
  actionEpisodesRequest,
  actionFavoriteEpisodesLocalStorageLoad,
  actionSetSelectedPage,
  actionSetEpisodeCharacters,
  actionSetQuantityPages,
} from '../../redux/actions/action-episodes';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';
import EpisodesList from '../episodes-list';
import { isCheckFavorite } from '../../helpers/helpers';

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
      episodesLoad(isCheckFavorite(this.props.favoriteEpisodes, res.episodes));
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

  filter = async (name, episode, currentPage, selectPage) => {
    const { rickandmortyService, favoriteEpisodes, setQuantityPages, setEpisodeCharacters } = this.props;

    const res = await rickandmortyService.getAllEpisodes(name, episode, currentPage);

    //calling these actions results in 429 status code
    // this.props.episodesRequest();

    this.props.setSelectedPage(selectPage);

    const episodeCharacters = await rickandmortyService.getEpisodeCharacters(null, name, episode, currentPage);
    setEpisodeCharacters(episodeCharacters);

    setQuantityPages(res.info.pages);
    return isCheckFavorite(favoriteEpisodes, res.episodes);
  };

  handlePageClick = (data, name, episode) => {
    const { episodesLoad, favoriteEpisodes, episodesRequest, setSelectedPage } = this.props;

    //calling these actions results in 429 status code
    // episodesRequest();

    let numberPage = data.selected + 1;
    let selectPage = data.selected;
    setSelectedPage(selectPage);

    this.filter(name.value, episode.value, numberPage, selectPage).then((items) => {
      episodesLoad(items);
      isCheckFavorite(favoriteEpisodes, items);
    });
  };

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <EpisodesList
        episodes={this.props.episodes}
        episodeCharacters={this.props.episodeCharacters}
        quantityPages={this.props.quantityPages}
        selectPage={this.props.selectPage}
        handlePageClick={this.handlePageClick}
        addToFavorite={this.props.addToFavorite}
        episodesLoad={this.props.episodesLoad}
        filter={this.filter}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = ({ episodesList, auth }) => {
  return {
    episodes: episodesList.episodes,
    episodeCharacters: episodesList.episodeCharacters,
    quantityPages: episodesList.quantityPages,
    selectPage: episodesList.selectPage,
    favoriteEpisodes: episodesList.favoriteEpisodes,
    loading: episodesList.loading,
    error: episodesList.error,
    isAuth: !!auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      episodesRequest: () => actionEpisodesRequest(),
      episodesLoad: (newEpisodes) => actionEpisodesLoad(newEpisodes),
      setEpisodeCharacters: (episodeCharacters) => actionSetEpisodeCharacters(episodeCharacters),
      favoriteEpisodesLocalStorageLoad: () => actionFavoriteEpisodesLocalStorageLoad(),
      setQuantityPages: (quantityPages) => actionSetQuantityPages(quantityPages),
      setSelectedPage: (selectPage) => actionSetSelectedPage(selectPage),
      addToFavorite: (episodes, episode) => actionAddToFavorite(episodes, episode),
      episodesError: (error) => actionEpisodesError(error),
    },
    dispatch
  );
};

export default compose(withRickandmortyService(), connect(mapStateToProps, mapDispatchToProps))(EpisodesListContainer);
