import React from 'react';
import Button from '../../UI/button';
import crossIcon from '../../../assets/icons/cross.svg';

class FavoriteCharactersListItem extends React.Component {
  render() {
    const {id, image, name, status, species, origin, location, choiceStatusCharacter, removeFromFavoriteHandler} = this.props;

    return (
      <div key={id} className="col-md-6 gx-4 gy-2 mb-4 h-auto">
        <div className="card favorite-character-card">
          <div className="row">
            <div className="col-md-4">
              <img className="character-icon" src={image} alt="card-image"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="character-name col-md-8 col-sm-12">{name}</div>
                  <div className="col-md-4 text-center col-sm-12 d-flex justify-content-center align-items-center gap-2">
                    <img className="status-img" src={choiceStatusCharacter(status)} alt="status"/>
                    {status}
                  </div>
                </div>
                <div className="row text-left mb-2 text-xs-center">
                  <div className="character-race col-md-6">Раса:</div>
                  <div className="character-race-value col-md-4">{species}</div>
                </div>
                <div className="row text-left mb-2 text-xs-center">
                  <div className="character-origin col-md-6">Место происхождения:</div>
                  <div className="character-origin-value col-md-6">{origin && origin.name}</div>
                </div>
                <div className="row text-left text-xs-center">
                  <div className="character-location col-md-6">Последняя локация:</div>
                  <div className="character-location-value col-md-6">{location && location.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <div className="favorite-character-btn col-lg-5 col-md-8">
            <Button type="circle-remove-from-favorite-btn" onClick={() => removeFromFavoriteHandler(id)}>
              <img src={crossIcon} alt="cross"/>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteCharactersListItem;
