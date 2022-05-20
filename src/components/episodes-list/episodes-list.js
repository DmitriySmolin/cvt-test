import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../UI/input';
import Button from '../UI/button';
import backBtn from '../../assets/icons/black-arrow.svg';
import ReactPaginate from 'react-paginate';
import EpisodesListItem from './episodes-list-item';

class EpisodesList extends React.Component {
  state = {
    hideNav: null,
    status: 'Выберите статус персонажа',
    isActiveList: true,
    isActiveGrid: false,
    formFilters: {
      name: {
        label: 'Поиск по названию',
        value: '',
        placeholder: 'Введите название серии',
      },
      episode: {
        label: 'Поиск по эпизоду',
        value: '',
        placeholder: 'Введите название эпизода',
      },
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
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

  onSelectChangeHandler = (event) => {
    this.setState({ status: event.target.value });
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
      formFilters: { name, episode },
    } = this.state;

    if (event.key === 'Enter') {
      this.props.filter(name.value, episode.value).then((data) => {
        this.props.episodesLoad(data);
      });
    }
  };

  addToFavoriteHandler = (id) => {
    const { episodes, addToFavorite } = this.props;

    const episode = episodes.find((episode) => episode.id === id);

    if (episode.isFavorite) {
      return false;
    }

    episode.isFavorite = true;
    addToFavorite(episodes, episode);
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

  renderListItemEpisodes = () => {
    return this.props.episodes.map((episode, index) => {
      const { ...itemProps } = episode;

      return (
        <EpisodesListItem
          key={episode.id}
          {...itemProps}
          episodeCharacters={this.props.episodeCharacters[index]}
          choiceStatusCharacter={this.choiceStatusCharacter}
          addToFavoriteHandler={this.addToFavoriteHandler}
          isActiveList={this.state.isActiveList}
          isAuth={this.props.isAuth}
        />
      );
    });
  };

  renderPagination = () => {
    const {
      formFilters: { name, episode },
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
          containerClassName={'pagination align-items-center justify-content-center '}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'prev-item page-item'}
          previousLinkClassName={'prev-link page-link'}
          nextClassName={'next-item page-item'}
          nextLinkClassName={'next-link page-link'}
          onPageChange={(data) => this.props.handlePageClick(data, name, episode)}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active-page'}
        />
      </nav>
    );
  };

  render() {
    return (
      <main className="main episode-main row mt-5 ">
        <NavLink to="/" className="col-md-5 col-sm-12">
          <Button type="back-btn">
            <img src={backBtn} alt="back-btn" />
            <span className="mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="page-title col-md-7 col-sm-12">Эпизоды</div>
        <form className="episode-form mt-5 mb-3 d-flex justify-content-between">
          <div className="episode-inputs col-md-12 d-flex justify-content-between gap-4">{this.renderInputs()}</div>
        </form>
        {this.renderListItemEpisodes()}
        {this.renderPagination()}
      </main>
    );
  }
}

export default EpisodesList;
