import React from 'react';
import {connect} from 'react-redux';
import withRickandmortyService from '../hoc';
import Spinner from '../spinner/spinner';
import {actionAddToFavorite, actionLocationsError, actionLocationsLoad, actionLocationsRequest, actionFavoriteLocationsLocalStorageLoad, actionSetQuantityPages} from '../../redux/actions/action-locations';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import ErrorIndicator from '../error-indicator';
import compose from '../../utils';
import LocationsList from '../locations-list';


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
      locationsLoad(this.isCheckFavorite(this.props.favoriteLocations, res.locations));

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

  filter = async (name, type, dimension, currentPage) => {
    const {rickandmortyService, favoriteLocations, setQuantityPages} = this.props;

    const data = rickandmortyService.getAllLocations(name, type, dimension, currentPage);
    const res = await data;
    setQuantityPages(res.info.pages);
    return this.isCheckFavorite(favoriteLocations, res.locations);
  };

  handlePageClick = (data, name, race, status) => {

    const {locationsLoad, favoriteLocations, locationsRequest} = this.props;

    let numberPage = data.selected + 1;

    this.filter(name.value, race.value, status, numberPage).then(items => {
      locationsRequest();
      locationsLoad(items);
      this.isCheckFavorite(favoriteLocations, items);
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
      <LocationsList locations={this.props.locations}
                      quantityPages={this.props.quantityPages}
                      handlePageClick={this.handlePageClick}
                      addToFavorite={this.props.addToFavorite}
                      locationsLoad={this.props.locationsLoad}
                      filter={this.filter}
                      isAuth={this.props.isAuth}
      />
    );
  }
}

const mapStateToProps = ({locationsList, auth}) => {
  return {
    locations: locationsList.locations,
    quantityPages: locationsList.quantityPages,
    favoriteLocations: locationsList.favoriteLocations,
    loading: locationsList.loading,
    error: locationsList.error,
    isAuth: !!auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    locationsRequest: () => actionLocationsRequest(),
    locationsLoad: (newLocations) => actionLocationsLoad(newLocations),
    favoriteLocationsLocalStorageLoad: () => actionFavoriteLocationsLocalStorageLoad(),
    setQuantityPages: (quantityPages) => actionSetQuantityPages(quantityPages),
    addToFavorite: (locations, location) => actionAddToFavorite(locations, location),
    locationsError: (error) => actionLocationsError(error),
  }, dispatch);
};

export default compose(
  withRickandmortyService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LocationsListContainer);

