import React from 'react';
import { connect } from 'react-redux';
import { withRickandmortyService } from '../hoc';
import Spinner from '../spinner/spinner';
import {
  actionAddToFavorite,
  actionLocationsError,
  actionLocationsLoad,
  actionLocationsRequest,
  actionFavoriteLocationsLocalStorageLoad,
  actionSetQuantityPages,
  actionSetSelectedPage,
} from '../../redux/actions/action-locations';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';
import LocationsList from '../locations-list';
import { isCheckFavorite } from '../../helpers/helpers';

class LocationsListContainer extends React.Component {
  async componentDidMount() {
    const {
      rickandmortyService,
      locationsRequest,
      locationsLoad,
      setQuantityPages,
      favoriteLocationsLocalStorageLoad,
      locationsError,
    } = this.props;

    locationsRequest();

    try {
      const data = rickandmortyService.getAllLocations();
      const res = await data;

      setQuantityPages(res.info.pages);
      favoriteLocationsLocalStorageLoad();
      locationsLoad(isCheckFavorite(this.props.favoriteLocations, res.locations));
    } catch (error) {
      locationsError(error);
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

  filter = async (name, type, dimension, currentPage, selectPage) => {
    const { rickandmortyService, favoriteLocations, setQuantityPages } = this.props;

    const res = await rickandmortyService.getAllLocations(name, type, dimension, currentPage);

    this.props.locationsRequest();
    this.props.setSelectedPage(selectPage);

    setQuantityPages(res.info.pages);
    return isCheckFavorite(favoriteLocations, res.locations);
  };

  handlePageClick = (data, name, race, dimension) => {
    const { locationsLoad, favoriteLocations, locationsRequest, setSelectedPage } = this.props;

    locationsRequest();

    let numberPage = data.selected + 1;
    let selectPage = data.selected;
    setSelectedPage(selectPage);

    this.filter(name.value, race.value, dimension.value, numberPage, selectPage).then((items) => {
      locationsLoad(items);
      isCheckFavorite(favoriteLocations, items);
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
      <LocationsList
        locations={this.props.locations}
        quantityPages={this.props.quantityPages}
        selectPage={this.props.selectPage}
        handlePageClick={this.handlePageClick}
        addToFavorite={this.props.addToFavorite}
        locationsLoad={this.props.locationsLoad}
        filter={this.filter}
        isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = ({ locationsList, auth }) => {
  return {
    locations: locationsList.locations,
    quantityPages: locationsList.quantityPages,
    selectPage: locationsList.selectPage,
    favoriteLocations: locationsList.favoriteLocations,
    loading: locationsList.loading,
    error: locationsList.error,
    isAuth: !!auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      locationsRequest: () => actionLocationsRequest(),
      locationsLoad: (newLocations) => actionLocationsLoad(newLocations),
      favoriteLocationsLocalStorageLoad: () => actionFavoriteLocationsLocalStorageLoad(),
      setQuantityPages: (quantityPages) => actionSetQuantityPages(quantityPages),
      setSelectedPage: (selectPage) => actionSetSelectedPage(selectPage),
      addToFavorite: (locations, location) => actionAddToFavorite(locations, location),
      locationsError: (error) => actionLocationsError(error),
    },
    dispatch
  );
};

export default compose(withRickandmortyService(), connect(mapStateToProps, mapDispatchToProps))(LocationsListContainer);
