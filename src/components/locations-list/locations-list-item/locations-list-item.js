import React from 'react';
import Button from '../../UI/button';
import plusIcon from '../../../assets/icons/plus.svg';
import isFavoriteFillIcon from '../../../assets/icons/fill-check-green.svg';

class LocationsListItem extends React.Component {
  render() {
    const { id, name, type, dimension, residents, isFavorite, isAuth, addToFavoriteHandler } = this.props;

    return (
      <div key={id} className="col-md-6 gx-4 gy-2 mb-4">
        <div className="location-card card">
          <div className="location-body card-body">
            <div className="row mb-2">
              <div className="location-name d-flex justify-content-center align-items-center gap-2 col-md-8col-sm-12">
                {name}
              </div>
              <div className="location-btn col-lg-5 col-md-4">
                {isAuth ? (
                  !isFavorite ? (
                    <Button type="circle-add-to-favorite-btn" onClick={() => addToFavoriteHandler(id)}>
                      <img src={plusIcon} alt="plus" />
                    </Button>
                  ) : (
                    <img className="location-favorite-icon" src={isFavoriteFillIcon} alt="check" />
                  )
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="row mb-2">
                  <div className="location-type col-md-12">Тип:</div>
                  <div className="location-type-value col-md-12">{type}</div>
                </div>
                <div className="row mb-2">
                  <div className="location-dimension col-md-12">Измерение:</div>
                  <div className="location-dimension-value col-md-12">{dimension}</div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row mb-2">
                  <div className="location-count-characters col-md-12">
                    Количество персонажей, которые в последний раз были замечены здесь:
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="location-count-characters-value col-md-12">{residents.length}</div>
                </div>
              </div>
            </div>
            <div className="grid-btn-wrapper row d-flex justify-content-end "></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationsListItem;
