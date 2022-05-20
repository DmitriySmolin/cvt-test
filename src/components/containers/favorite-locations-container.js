import React from 'react';
import { connect } from 'react-redux';
import {
  actionFavoriteLocationsLocalStorageLoad,
  actionFilterFavorite,
  actionRemoveFromFavorite,
} from '../../redux/actions/action-locations';
import bindActionCreators from 'react-redux/es/utils/bindActionCreators';
import compose from '../../utils';
import FavoriteLocationsList from '../favorite-locations-list/favorie-locations-list';

class FavoriteLocationsContainer extends React.Component {
  componentDidMount() {
    this.props.favoriteLocationsLocalStorageLoad();
  }

  render() {
    return (
      <FavoriteLocationsList
        favoriteLocations={this.props.favoriteLocations}
        removeFromFavorite={this.props.removeFromFavorite}
        filterFavorite={this.props.filterFavorite}
        favoriteLocationsLocalStorageLoad={this.props.favoriteLocationsLocalStorageLoad}
      />
    );
  }
}

const mapStateToProps = ({ locationsList }) => {
  return {
    favoriteLocations: locationsList.favoriteLocations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      favoriteLocationsLocalStorageLoad: () => actionFavoriteLocationsLocalStorageLoad(),
      removeFromFavorite: (favoriteLocations) => actionRemoveFromFavorite(favoriteLocations),
      filterFavorite: (favoriteLocations) => actionFilterFavorite(favoriteLocations),
    },
    dispatch
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FavoriteLocationsContainer);
