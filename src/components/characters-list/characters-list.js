import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../UI/input';
import Button from '../UI/button';
import Select from '../UI/select';
import list from '../../assets/icons/list.svg';
import grid from '../../assets/icons/grid.svg';
import listActive from '../../assets/icons/hover-list.svg';
import gridActive from '../../assets/icons/hover-grid.svg';
import dotYellow from '../../assets/icons/dot-yellow.svg';
import dotGreen from '../../assets/icons/dot-green.svg';
import dotRed from '../../assets/icons/dot-red.svg';
import backBtn from '../../assets/icons/black-arrow.svg';
import ReactPaginate from 'react-paginate';
import CharactersListItem from './characters-list-item';

class CharactersList extends React.Component {
  state = {
    hideNav: null,
    status: 'Выберите статус персонажа',
    isActiveList: 'list',
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
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    localStorage.getItem('status') && this.setState({ status: localStorage.getItem('status') });
    localStorage.getItem('isActiveList') && this.setState({ isActiveList: localStorage.getItem('isActiveList') });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  resize() {
    let currentHideNav = window.innerWidth <= 450;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  getLastSymbol = (str) => {
    const idRegExp = /\/(\d+)*$/;
    return str.match(idRegExp)[1];
  };

  onSelectChangeHandler = (event) => {
    this.setState({ status: event.target.value });
    localStorage.setItem('status', event.target.value);
  };

  onChangeHandler = (event, controlName) => {
    const formFilters = { ...this.state.formFilters };
    const control = { ...formFilters[controlName] };
    control.value = event.target.value;

    formFilters[controlName] = control;

    this.setState({ formFilters });
  };

  onKeyPressHandler = (event) => {
    const {
      formFilters: { name, race },
      status,
    } = this.state;

    if (event.key === 'Enter') {
      this.props.filter(name.value, race.value, status).then((data) => {
        this.props.charactersLoad(data);
      });
    }
  };

  addToFavoriteHandler = (id) => {
    const { characters, addToFavorite } = this.props;

    const char = characters.find((char) => char.id === id);

    if (char.isFavorite) {
      return false;
    }

    char.isFavorite = true;
    addToFavorite(characters, char);
  };

  renderInputs = () => {
    const { formFilters } = this.state;

    return Object.keys(formFilters).map((controlName, index) => {
      const control = formFilters[controlName];
      return (
        <Input
          key={controlName + index}
          placeholder={control.placeholder}
          value={control.value}
          label={control.label}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          onKeyPress={(event) => this.onKeyPressHandler(event)}
        />
      );
    });
  };

  renderSelect = () => {
    const options = [
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
        value: 'unknown',
      },
    ];

    return (
      <Select
        label="Поиск по статусу"
        onChange={this.onSelectChangeHandler}
        value={this.state.status}
        options={options}
      />
    );
  };

  choiceStatusCharacter = (status) => {
    return status === 'Alive' ? dotGreen : status === 'Dead' ? dotRed : status === 'unknown' ? dotYellow : '';
  };
  renderListItemCharacters = () => {
    return this.props.characters.map((char) => {
      const { ...itemProps } = char;

      return (
        <CharactersListItem
          key={char.id}
          {...itemProps}
          choiceStatusCharacter={this.choiceStatusCharacter}
          getLastSymbol={this.getLastSymbol}
          addToFavoriteHandler={this.addToFavoriteHandler}
          isActiveList={this.state.isActiveList}
          isAuth={this.props.isAuth}
        />
      );
    });
  };

  renderPagination = () => {
    const {
      formFilters: { name, race },
      status,
    } = this.state;
    let pageRangeDisplayed = 5;

    if (this.state.hideNav) {
      pageRangeDisplayed = 0;
    }

    return (
      <nav aria-label="Page navigation example">
        <ReactPaginate
          pageCount={Math.ceil(this.props.quantityPages)}
          marginPagesDisplayed={0}
          pageRangeDisplayed={pageRangeDisplayed}
          forcePage={this.props.selectPage}
          breakLabel=""
          nextLabel={`Следующая`}
          previousLabel="Предыдущая"
          containerClassName={'pagination align-items-center justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'prev-item page-item'}
          previousLinkClassName={'prev-link page-link'}
          nextClassName={'next-item page-item'}
          nextLinkClassName={'next-link page-link'}
          onPageChange={(data) => this.props.handlePageClick(data, name, race, status)}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active-page'}
        />
      </nav>
    );
  };

  render() {
    const { isActiveList } = this.state;

    return (
      <main className="main character-main row mt-5 ">
        <NavLink to="/" className="col-md-5 col-sm-12">
          <Button type="back-btn">
            <img src={backBtn} alt="back-btn" />
            <span className="mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="page-title col-md-7 col-sm-12">Персонажи</div>
        <form className="character-form mt-5 d-flex justify-content-between">
          <div className="character-inputs col-md-10 d-flex justify-content-between gap-4">
            {this.renderInputs()}
            {this.renderSelect()}
          </div>
          <div className="view justify-content-end">
            <div className="view-title text-start">Вид:</div>
            <div className="view-buttons d-flex gap-3 justify-content-end">
              <div
                onClick={() => {
                  this.setState({ isActiveList: 'list' });
                  localStorage.setItem('isActiveList', 'list');
                }}
              >
                <img src={isActiveList === 'list' ? listActive : list} alt="list" />
              </div>
              <div
                onClick={() => {
                  this.setState({ isActiveList: null });
                  localStorage.setItem('isActiveList', null);
                }}
              >
                <img src={isActiveList === 'list' ? grid : gridActive} alt="grid" />
              </div>
            </div>
          </div>
        </form>
        {this.renderListItemCharacters()}
        {this.renderPagination()}
      </main>
    );
  }
}

export default CharactersList;
