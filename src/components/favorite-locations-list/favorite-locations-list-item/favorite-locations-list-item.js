import React from 'react';
import Button from '../../UI/button';
import crossIcon from '../../../assets/icons/cross.svg';

class FavoriteLocationsListItem extends React.Component {
  render() {
    const { id, name, type, dimension, residents, removeFromFavoriteHandler } = this.props;

    return (
      <div key={id} className="col-md-6 gx-4 gy-2 mb-4">
        <div className="location-card card">
          <div className="location-body card-body">
            <div className="row mb-2">
              <div className="location-name d-flex justify-content-center align-items-center gap-2 col-md-8col-sm-12">
                {name}
              </div>
              <div className="grid-btn favorite-location-btn col-lg-5 col-md-4">
                <Button type="circle-remove-from-favorite-btn" onClick={() => removeFromFavoriteHandler(id)}>
                  <img src={crossIcon} alt="cross" />
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="row mb-2">
                  <div className="location-type col-md-12">Тип:</div>
                  <div className="location-type-value  col-md-12">{type}</div>
                </div>
                <div className="row mb-2">
                  <div className="location-dimension col-md-12">Измерение:</div>
                  <div className="location-dimension-value  col-md-12">{dimension}</div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row mb-2">
                  <div className="location-count-characters col-md-12">
                    Количество персонажей, которые в последний раз были замечены здесь:
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="location-count-characters-value col-md-12">{residents && residents.length}</div>
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

export default FavoriteLocationsListItem;
