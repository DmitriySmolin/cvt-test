import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../UI/input';
import Button from '../UI/button';
import backBtn from '../../assets/icons/black-arrow.svg';
import ReactPaginate from 'react-paginate';
import LocationsListItem from './locations-list-item';

class LocationsList extends React.Component {
  state = {
    hideNav: null,
    status: '',
    isActiveList: true,
    isActiveGrid: false,
    formFilters: {
      name: {
        label: 'Поиск по названию',
        value: '',
        placeholder: 'Введите название локации',
      },
      type: {
        label: 'Поиск по типу',
        value: '',
        placeholder: 'Введите тип локации',
      },
      dimension: {
        label: 'Поиск по измерению',
        value: '',
        placeholder: 'Введите измерение',
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

  onChangeHandler = (event, controlName) => {
    const formFilters = { ...this.state.formFilters };
    const control = { ...formFilters[controlName] };
    control.value = event.target.value;

    formFilters[controlName] = control;

    this.setState({ formFilters });
  };

  onKeyPressHandler = (event) => {
    const {
      formFilters: { name, type, dimension },
    } = this.state;

    if (event.key === 'Enter') {
      this.props.filter(name.value, type.value, dimension.value).then((data) => {
        this.props.locationsLoad(data);
      });
    }
  };

  addToFavoriteHandler = (id) => {
    const { locations, addToFavorite } = this.props;

    const location = locations.find((char) => char.id === id);

    if (location.isFavorite) {
      return false;
    }

    location.isFavorite = true;
    addToFavorite(locations, location);
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

  renderListItemLocations = () => {
    return this.props.locations.map((location) => {
      const { ...itemProps } = location;
      return (
        <LocationsListItem
          key={location.id}
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
      formFilters: { name, type, dimension },
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
          onPageChange={(data) => this.props.handlePageClick(data, name, type, dimension)}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active-page'}
        />
      </nav>
    );
  };

  render() {
    return (
      <main className="main location-main row mt-5 ">
        <NavLink to="/" className="col-md-5 col-sm-12">
          <Button type="back-btn">
            <img src={backBtn} alt="back-btn" />
            <span className="mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="page-title col-md-7 col-sm-12">Локации</div>
        <form className="location-form mt-5 mb-3 d-flex justify-content-between">
          <div className="location-inputs col-md-12 d-flex justify-content-between gap-4">{this.renderInputs()}</div>
        </form>
        {this.renderListItemLocations()}
        {this.renderPagination()}
      </main>
    );
  }
}

export default LocationsList;
