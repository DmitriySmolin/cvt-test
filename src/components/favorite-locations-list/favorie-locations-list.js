import React from 'react';
import FavoriteLocationsListItem from './favorite-locations-list-item';
import { sortArray } from '../../helpers/helpers';

class FavoriteLocationsList extends React.Component {
  state = {
    filterLocations: null,
  };

  componentDidMount() {
    this.setState({ filterLocations: localStorage.getItem('filterLocations') });
  }

  removeFromFavoriteHandler = (id) => {
    const { favoriteLocations, removeFromFavorite } = this.props;

    let filteredFavoriteLocations = favoriteLocations.filter((location) => location.id !== id);

    removeFromFavorite(filteredFavoriteLocations);
  };

  filterFavoriteLocationsHandler = (key) => {
    this.setState({ filterLocations: key });
    localStorage.setItem('filterLocations', key);

    const filteredFavoriteLocations = this.props.favoriteLocations.sort(sortArray(key));
    this.props.filterFavorite(filteredFavoriteLocations);
    this.props.favoriteLocationsLocalStorageLoad();
  };

  render() {
    const { favoriteLocations } = this.props;

    if (favoriteLocations.length === 0) {
      return (
        <div className="title-no-favorites d-flex justify-content-center align-items-center px-2 mb-4 ">
          У вас пока нет избранных локаций
        </div>
      );
    }

    return (
      <>
        <div className="sort-block d-flex flex-column flex-md-row align-items-center mt-5 px-2 mb-4 ">
          <div className="sort-text px-2" onClick={() => this.filterFavoriteLocationsHandler('id')}>
            Сортировать:
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterLocations === 'name' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteLocationsHandler('name')}
          >
            по названию
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterLocations === 'type' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteLocationsHandler('type')}
          >
            по типу
          </div>
          <div
            className={`sort-name px-3 ${this.state.filterLocations === 'dimension' ? 'active-sort' : ''}`}
            onClick={() => this.filterFavoriteLocationsHandler('dimension')}
          >
            по измерению
          </div>
        </div>
        <div className="row row-cols-md-4 col-md-12">
          {favoriteLocations.map((location) => {
            const { ...itemProps } = location;
            return (
              <FavoriteLocationsListItem
                key={location.id}
                {...itemProps}
                removeFromFavoriteHandler={this.removeFromFavoriteHandler}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default FavoriteLocationsList;
