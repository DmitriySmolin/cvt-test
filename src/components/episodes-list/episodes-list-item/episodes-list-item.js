import React from 'react';
import Button from '../../UI/button';
import plusIcon from '../../../assets/icons/plus.svg';
import isFavoriteIcon from '../../../assets/icons/check-green.svg';

class EpisodesListItem extends React.Component {
  render() {
    const { id, name, air_date, episode, episodeCharacters, isFavorite, isAuth, addToFavoriteHandler } = this.props;

    return (
      <div key={id} className="col-md-12 gx-4 gy-2 mb-4">
        <div className="episode-card card mb-3">
          <div className="episode-body card-body">
            <div className="row mb-2">
              <div className="episode-name col-md-7 col-sm-6 text-left">{name}</div>
              <div className="episode-btn col-md-5 col-sm-6">
                {isAuth ? (
                  !isFavorite ? (
                    <Button type="add-to-favorite-btn" onClick={() => addToFavoriteHandler(id)}>
                      <img src={plusIcon} alt="plus" />
                      Добавить в избранное
                    </Button>
                  ) : (
                    <Button type="is-favorite-btn">
                      <img src={isFavoriteIcon} alt="is-favorite-icon" />В избранном
                    </Button>
                  )
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <div className="row mb-2">
                  <div className="episode-episode col-md-12">Эпизод:</div>
                  <div className="location-episode-value col-md-12">{episode}</div>
                </div>
                <div className="row mb-2">
                  <div className="episode-air-date col-md-12">Дата выхода:</div>
                  <div className="episode-air-date-value col-md-12">{air_date}</div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row mb-2">
                  <div className="episode-characters col-md-12">Персонажи, участвующие в эпизоде:</div>
                </div>
                <div className="row mb-2">
                  <div className="episode-characters-value col-md-12">
                    {episodeCharacters &&
                      episodeCharacters.map((char, index) => {
                        let res;

                        index === episodeCharacters.length - 1 ? (res = char.name + '.') : (res = char.name + ', ');

                        return res;
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodesListItem;
