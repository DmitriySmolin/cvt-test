import React from 'react';
import './main-page.scss';
import characterImg from '../../assets/backgrounds/characters.svg';
import locationImg from '../../assets/backgrounds/locations.svg';
import episodeImg from '../../assets/backgrounds/episodes.svg';
import {NavLink} from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
      <NavLink to="/characters">
        <div className="col">
          <div className="card h-100 p-3">
            <img src={characterImg} className="card-img-top rounded-3" alt="characters"/>
            <div className="card-body">
              <h5 className="card-title">Персонажи</h5>
              <p className="card-text mt-4">Зайди и познакомься со всеми персонажами вселенной</p>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to="/locations">
        <div className="col">
          <div className="card h-100 p-3">
            <img src={locationImg} className="card-img-top rounded-3" alt="locations"/>
            <div className="card-body">
              <h5 className="card-title">Локации</h5>
              <p className="card-text mt-4">Исследуй все локации. Давай же, не будь занудой!</p>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to="episodes">
        <div className="col">
          <div className="card h-100 p-3">
            <img src={episodeImg} className="card-img-top rounded-3" alt="episodes"/>
            <div className="card-body">
              <h5 className="card-title">Эпизоды</h5>
              <p className="card-text mt-4">Узнай чуть больше о карте приключений Рика и Морти</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default MainPage;
