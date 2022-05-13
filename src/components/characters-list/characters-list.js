import React from 'react';
import './characters-list.scss';
import {connect} from 'react-redux';
import withRickandmortyService from '../hoc';
import {NavLink} from 'react-router-dom';
import Spinner from '../spinner/spinner';
import {actionAddToFavorite, actionCharactersError, actionCharactersLoad, actionCharactersRequest, actionFavoriteCharactersLoad} from '../../redux/actions/action-characters';
import Input from '../UI/input';
import Button from '../UI/button';
import Select from '../UI/select';
import list from '../../assets/icons/list.svg';
import grid from '../../assets/icons/grid.svg';
import listActive from '../../assets/icons/hover-list.svg';
import gridActive from '../../assets/icons/hover-grid.svg';
import plusIcon from '../../assets/icons/plus.svg';
import dotYellow from '../../assets/icons/dot-yellow.svg';
import dotGreen from '../../assets/icons/dot-green.svg';
import dotRed from '../../assets/icons/dot-red.svg';
import backBtn from '../../assets/icons/black-arrow.svg';
import isFavoriteFillIcon from '../../assets/icons/fill-check-green.svg';
import isFavoriteIcon from '../../assets/icons/check-green.svg';
import ReactPaginate from 'react-paginate';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';


class CharactersList extends React.Component {
  state = {
    hideNav: null,
    quantityPages: null,
    status: 'Выберите статус персонажа',
    isActiveList: true,
    isActiveGrid: false,
    formFilters: {
      name: {
        label: 'Поиск по имени',
        value: '',
        placeholder: 'Введите имя персонажа',
      },
      race: {
        label: 'Поиск по расе',
        value: '',
        placeholder: 'Введите расу персонажа',
      },
    }
  };

  async componentDidMount() {

    const {
      rickandmortyService,
      charactersRequest,
      charactersLoad,
      favoriteCharactersLoad,
      charactersError,
      favoriteCharacters
    } = this.props;

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    charactersRequest();

    try {
      const data = rickandmortyService.getAllCharacters();
      const res = await data;

      this.setState({quantityPages: res.info.pages});
      favoriteCharactersLoad();

      charactersLoad(this.isCheckFavorite(favoriteCharacters, res.characters));
    } catch (error) {
      charactersError(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 450);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({hideNav: currentHideNav});
    }
  }

  getLastSymbol = (str) => {
    const idRegExp = /\/(\d+)*$/;
    return str.match(idRegExp)[1];
  };

  onSelectChangeHandler = (event) => {
    this.setState({status: event.target.value});
  };

  onChangeHandler = (event, controlName) => {
    const formFilters = {...this.state.formFilters};
    const control = {...formFilters[controlName]};
    control.value = event.target.value;

    formFilters[controlName] = control;

    this.setState({formFilters});
  };

  onKeyPressHandler = (event) => {

    const {formFilters: {name, race}, status} = this.state;

    if (event.key === 'Enter') {
      this.filter(name.value, race.value, status).then(data => {
        this.props.charactersLoad(data);
      });
    }
  };

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

  filter = async (name, race, status, currentPage) => {
    const {rickandmortyService, favoriteCharacters} = this.props;

    const data = rickandmortyService.getAllCharacters(name, race, status, currentPage);
    const res = await data;
    this.setState({quantityPages: res.info.pages});
    return this.isCheckFavorite(favoriteCharacters, res.characters);
  };

  renderInputs = () => {
    const {formFilters} = this.state;

    return Object.keys(formFilters).map((controlName, index) => {
      const control = formFilters[controlName];
      return <Input
        key={controlName + index}
        placeholder={control.placeholder}
        value={control.value}
        label={control.label}
        onChange={event => this.onChangeHandler(event, controlName)}
        onKeyPress={event => this.onKeyPressHandler(event)}
      />;
    });
  };

  renderSelect = () => {
    const options =
      [
        {
          text: 'Выберите статус персонажа',
          value: 'Выберите статус персонажа',
        },
        {
          text: `Alive`,
          value: 'Alive',
        },
        {
          text: 'Dead',
          value: 'Dead',
        },
        {
          text: 'Unknown',
          value: 'unknown'
        }
      ];

    return <Select
      label="Поиск по статусу"
      onChange={this.onSelectChangeHandler}
      value={this.state.status}
      options={options}
    />;
  };

  choiceStatusCharacter = (status) => {
    return status === 'Alive'
      ?
      dotGreen
      :
      status === 'Dead'
        ?
        dotRed
        :
        status === 'unknown'
          ?
          dotYellow
          :
          '';
  };

  renderListCharacters = (characters) => {
    return characters.map(char => {

      const {id, image, name, status, species, gender, origin, episode, location, isFavorite} = char;

      return <div key={id} className="character-card card mb-3">
        <div className="row">
          <div className="col-md-3">
            <img className="character-icon" src={image} alt="card-image"/>
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="row mb-2">
                <div className="character-name col-md-10 col-sm-12">{name}</div>
                <div className="col-md-2 text-center col-sm-12 d-flex justify-content-center align-items-center gap-2">
                  <img
                    className="mx-sm-2 status-img"
                    src={this.choiceStatusCharacter(status)}
                    alt="status"/>
                  {status}
                </div>
              </div>
              <div className="row text-left mb-2 text-xs-center">
                <div className="character-race col-md-4">Раса:</div>
                <div className="character-race-value col-md-2">{species}</div>
                <div className="character-gender col-md-2">Пол:</div>
                <div className="character-gender-value col-md-2">{gender}</div>
              </div>
              <div className="row text-left mb-2 text-xs-center">
                <div className="character-origin col-md-4">Место происхождения:</div>
                <div className="character-origin-value col-md-2">{origin.name}</div>
                <div className="character-episode col-md-2">Эпизоды:</div>
                <div className="character-episode-value col-md-2">
                  {`${this.getLastSymbol(episode[0])}-${this.getLastSymbol(episode[episode.length - 1])}`}
                </div>
              </div>
              <div className="row text-left text-xs-center">
                <div className="character-location col-md-4">Последняя локация:</div>
                <div className="character-location-value col-md-4">{location.name}</div>
              </div>
              <div className="row d-flex justify-content-end ">
                <div className="character-btn col-lg-5 col-md-8">
                  {!isFavorite
                    ?
                    <Button type="add-to-favorite-btn" onClick={() => this.addToFavoriteHandler(id)}>
                      <img src={plusIcon} alt="plus"/>
                      Добавить в избранное
                    </Button>
                    : <Button type="is-favorite-btn">
                      <img src={isFavoriteIcon} alt="isFavoriteIcon"/>
                      В избранном
                    </Button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
    });
  };

  renderGridCharacters = (characters) => {
    return characters.map(char => {

      const {id, image, name, status, species, origin, location, isFavorite} = char;

      return (
        <div key={id} className="col-md-6  gx-4 mb-0">
          <div className="card character-card grid-card">
            <div className="row">
              <div className="col-md-4">
                <img className="character-icon" src={image} alt="card-image"/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="character-name col-md-8 col-sm-12">{name}</div>
                    <div className="col-md-4 text-center col-sm-12 d-flex justify-content-center align-items-center gap-2">
                      <img
                        className="status-img"
                        src={this.choiceStatusCharacter(status)}
                        alt="status"/>
                      {status}
                    </div>
                  </div>
                  <div className="row text-left mb-2 text-xs-center">
                    <div className="character-race col-md-6">Раса:</div>
                    <div className="character-race-value col-md-4">{species}</div>
                  </div>
                  <div className="row text-left mb-2 text-xs-center">
                    <div className="character-origin col-md-6">Место происхождения:</div>
                    <div className="character-origin-value col-md-6">{origin.name}</div>
                  </div>
                  <div className="row text-left text-xs-center">
                    <div className="character-location col-md-6">Последняя локация:</div>
                    <div className="character-location-value col-md-6">{location.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-btn-wrapper row d-flex justify-content-end ">
            <div className="grid-btn col-lg-5 col-md-8">
              {!isFavorite
                ?
                <Button type="circle-add-to-favorite-btn" onClick={() => this.addToFavoriteHandler(id)}>
                  <img src={plusIcon} alt="plus"/>
                </Button>
                :
                <img className="is-favorite-icon" src={isFavoriteFillIcon} alt="check"/>
              }
            </div>
          </div>
        </div>
      );
    });
  };

  createArrayNumbers = (length) => {
    let array = [];
    for (let i = 1; i <= length; i++) {
      array.push(i);
    }
    return array;
  };

  handlePageClick = (data) => {
    const {formFilters: {name, race}, status,} = this.state;
    const {charactersLoad, favoriteCharacters, charactersRequest} = this.props;

    let numberPage = data.selected + 1;


    this.filter(name.value, race.value, status, numberPage).then(items => {
      charactersRequest();
      charactersLoad(items);
      this.isCheckFavorite(favoriteCharacters, items);
    });

  };

  renderPagination = () => {

    let pageRangeDisplayed = 5;

    if (this.state.hideNav) {
      pageRangeDisplayed = 0;
    }

    return <nav aria-label="Page navigation example">
      <ReactPaginate
        pageCount={Math.ceil(this.state.quantityPages)}
        marginPagesDisplayed={0}
        pageRangeDisplayed={pageRangeDisplayed}
        breakLabel=""
        nextLabel={`Следующая`}
        previousLabel="Предыдущая"
        containerClassName={'pagination align-items-center justify-content-center '}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'prev-item page-item'}
        previousLinkClassName={'prev-link page-link'}
        nextClassName={'next-item page-item'}
        nextLinkClassName={'next-link page-link'}
        onPageChange={this.handlePageClick}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active-page'}
      />
    </nav>;
  };


  addToFavoriteHandler = (id) => {

    const {characters, addToFavorite} = this.props;

    const char = characters.find(char => char.id === id);

    if (char.isFavorite) {
      return false;
    }

    char.isFavorite = true;
    addToFavorite(characters, char);
  };


  render() {

    const {characters, loading, error} = this.props;
    const {isActiveList, isActiveGrid} = this.state;

    if (loading) {
      return <Spinner/>;
    }

    if (error) {
      return <ErrorIndicator/>;
    }

    return (
      <main className="main character-main row mt-5 ">
        <NavLink to="/" className="col-md-5 col-sm-12">
          <Button type={'back-btn'}>
            <img src={backBtn} alt="backBtn"/>
            <span className="back-btn-text mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="character-title col-md-7 col-sm-12">Персонажи</div>
        <form className="character-form mt-5 d-flex justify-content-between">
          <div className="character-inputs col-md-10 d-flex justify-content-between gap-4">
            {this.renderInputs()}
            {this.renderSelect()}
          </div>
          <div className="view justify-content-end">
            <div className="view-title text-start">
              Вид:
            </div>
            <div className="view-buttons d-flex gap-3 justify-content-end">
              <div onClick={() => this.setState({isActiveList: true, isActiveGrid: false})}>
                <img src={isActiveList ? listActive : list} alt="list"/>
              </div>
              <div onClick={() => this.setState({isActiveList: false, isActiveGrid: true})}>
                <img src={isActiveGrid ? gridActive : grid} alt="grid"/></div>
            </div>
          </div>
        </form>
        {isActiveList
          ? this.renderListCharacters(characters)
          : this.renderGridCharacters(characters)}
        {this.renderPagination()}
      </main>
    );
  }
}

const mapStateToProps = ({charactersList}) => {
  return {
    characters: charactersList.characters,
    favoriteCharacters: charactersList.favoriteCharacters,
    loading: charactersList.loading,
    error: charactersList.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    charactersRequest: () => actionCharactersRequest(),
    charactersLoad: (newCharacters) => actionCharactersLoad(newCharacters),
    addToFavorite: (characters, char) => actionAddToFavorite(characters, char),
    favoriteCharactersLoad: () => actionFavoriteCharactersLoad(),
    charactersError: (error) => actionCharactersError(error),
  }, dispatch);
};

export default compose(
  withRickandmortyService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CharactersList);

