import React from 'react';
import Button from '../../UI/button';
import plusIcon from '../../../assets/icons/plus.svg';
import isFavoriteIcon from '../../../assets/icons/check-green.svg';
import isFavoriteFillIcon from '../../../assets/icons/fill-check-green.svg';

class CharactersListItem extends React.Component {
  render() {
    const {
      id,
      image,
      name,
      status,
      species,
      gender,
      origin,
      episode,
      location,
      isFavorite,
      isActiveList,
      isAuth,
      choiceStatusCharacter,
      getLastSymbol,
      addToFavoriteHandler,
    } = this.props;

    const listView = (
      <div key={id} className="character-card card mb-3">
        <div className="row">
          <div className="col-md-3">
            <img className="character-icon" src={image} alt="card-image" />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="row mb-2">
                <div className="character-name col-md-10 col-sm-12">{name}</div>
                <div className="col-md-2 text-center col-sm-12 d-flex justify-content-center align-items-center gap-2">
                  <img className="mx-sm-2 status-img" src={choiceStatusCharacter(status)} alt="status" />
                  {status}
                </div>
              </div>
              <div className="row text-left mb-2 text-xs-center">
                <div className="character-race col-md-4">Раса:</div>
                <div className="character-race-value col-md-2">{species}</div>
                <div className="character-gender col-md-2">Пол:</div>
                <div className="character-gender-value col-md-2">{gender}</div>
              </div>
              <div className="row text-left mb-2 text-xs-center">
                <div className="character-origin col-md-4">Место происхождения:</div>
                <div className="character-origin-value col-md-2">{origin.name}</div>
                <div className="character-episode col-md-2">Эпизоды:</div>
                <div className="character-episode-value col-md-2">
                  {`${getLastSymbol(episode[0])}-${getLastSymbol(episode[episode.length - 1])}`}
                </div>
              </div>
              <div className="row text-left text-xs-center">
                <div className="character-location col-md-4">Последняя локация:</div>
                <div className="character-location-value col-md-4">{location.name}</div>
              </div>
              <div className="row d-flex justify-content-end ">
                <div className="character-btn col-lg-5 col-md-8">
                  {isAuth ? (
                    !isFavorite ? (
                      <Button type="add-to-favorite-btn" onClick={() => addToFavoriteHandler(id)}>
                        <img src={plusIcon} alt="plus" />
                        Добавить в избранное
                      </Button>
                    ) : (
                      <Button type="is-favorite-btn">
                        <img src={isFavoriteIcon} alt="isFavoriteIcon" />В избранном
                      </Button>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const gridView = (
      <div key={id} className="col-md-6 gx-4 gy-2 mb-4">
        <div className="card character-card character-grid-card">
          <div className="row">
            <div className="col-md-4">
              <img className="character-icon" src={image} alt="card-image" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="row mb-2">
                  <div className="character-name col-md-8 col-sm-12">{name}</div>
                  <div className="col-md-4 text-center col-sm-12 d-flex justify-content-center align-items-center gap-2">
                    <img className="status-img" src={choiceStatusCharacter(status)} alt="status" />
                    {status}
                  </div>
                </div>
                <div className="row text-left mb-2 text-xs-center">
                  <div className="character-race col-md-6">Раса:</div>
                  <div className="character-race-value col-md-4">{species}</div>
                </div>
                <div className="row text-left mb-2 text-xs-center">
                  <div className="character-origin col-md-6">Место происхождения:</div>
                  <div className="character-origin-value col-md-6">{origin.name}</div>
                </div>
                <div className="row text-left text-xs-center">
                  <div className="character-location col-md-6">Последняя локация:</div>
                  <div className="character-location-value col-md-6">{location.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end ">
          <div className="character-grid-btn col-lg-5 col-md-8">
            {isAuth ? (
              !isFavorite ? (
                <Button type="circle-add-to-favorite-btn" onClick={() => addToFavoriteHandler(id)}>
                  <img src={plusIcon} alt="plus" />
                </Button>
              ) : (
                <img className="character-favorite-icon" src={isFavoriteFillIcon} alt="check" />
              )
            ) : null}
          </div>
        </div>
      </div>
    );

    return isActiveList === 'list' ? listView : gridView;
  }
}

export default CharactersListItem;
