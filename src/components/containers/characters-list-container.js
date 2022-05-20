import React from 'react';
import { connect } from 'react-redux';
import { withRickandmortyService } from '../hoc';
import Spinner from '../spinner/spinner';
import {
  actionAddToFavorite,
  actionCharactersError,
  actionCharactersLoad,
  actionCharactersRequest,
  actionFavoriteCharactersLocalStorageLoad,
  actionSetQuantityPages,
  actionSetSelectedPage,
} from '../../redux/actions/action-characters';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';
import CharactersList from '../characters-list';
import { isCheckFavorite } from '../../helpers/helpers';

class CharactersListContainer extends React.Component {
  async componentDidMount() {
    const {
      rickandmortyService,
      charactersRequest,
      charactersLoad,
      setQuantityPages,
      favoriteCharactersLocalStorageLoad,
      charactersError,
    } = this.props;

    charactersRequest();

    try {
      const data = rickandmortyService.getAllCharacters();
      const res = await data;

      setQuantityPages(res.info.pages);
      favoriteCharactersLocalStorageLoad();
      charactersLoad(isCheckFavorite(this.props.favoriteCharacters, res.characters));
    } catch (error) {
      charactersError(error);
    }
  }

  filter = async (name, race, status, currentPage, selectPage) => {
    const { rickandmortyService, favoriteCharacters, setQuantityPages, charactersRequest, setSelectedPage } =
      this.props;

    charactersRequest();
    setSelectedPage(selectPage);

    const data = rickandmortyService.getAllCharacters(name, race, status, currentPage);
    const res = await data;
    setQuantityPages(res.info.pages);
    return isCheckFavorite(favoriteCharacters, res.characters);
  };

  handlePageClick = (data, name, race, status) => {
    const { charactersLoad, favoriteCharacters, charactersRequest } = this.props;

    charactersRequest();

    let numberPage = data.selected + 1;
    let selectPage = data.selected;

    this.filter(name.value, race.value, status, numberPage, selectPage).then((items) => {
      charactersLoad(items);
      isCheckFavorite(favoriteCharacters, items);
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
      <CharactersList
        characters={this.props.characters}
        quantityPages={this.props.quantityPages}
        selectPage={this.props.selectPage}
        handlePageClick={this.handlePageClick}
        addToFavorite={this.props.addToFavorite}
        charactersLoad={this.props.charactersLoad}
        filter={this.filter}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = ({ charactersList, auth }) => {
  return {
    characters: charactersList.characters,
    quantityPages: charactersList.quantityPages,
    selectPage: charactersList.selectPageCharacters,
    favoriteCharacters: charactersList.favoriteCharacters,
    loading: charactersList.loading,
    error: charactersList.error,
    isAuth: !!auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      charactersRequest: () => actionCharactersRequest(),
      charactersLoad: (newCharacters) => actionCharactersLoad(newCharacters),
      favoriteCharactersLocalStorageLoad: () => actionFavoriteCharactersLocalStorageLoad(),
      setQuantityPages: (quantityPages) => actionSetQuantityPages(quantityPages),
      setSelectedPage: (selectPage) => actionSetSelectedPage(selectPage),
      addToFavorite: (characters, char) => actionAddToFavorite(characters, char),
      charactersError: (error) => actionCharactersError(error),
    },
    dispatch
  );
};

export default compose(
  withRickandmortyService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CharactersListContainer);
