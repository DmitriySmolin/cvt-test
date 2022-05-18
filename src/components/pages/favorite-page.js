import React from 'react';
import './favorite-page.scss';
import favoriteLocations from '../../assets/backgrounds/favorite-locations.svg';
import favoriteCharacters from '../../assets/backgrounds/favorite-characters.svg';
import favoriteEpisodes from '../../assets/backgrounds/favorite-episodes.svg';
import {NavLink, Routes, Route} from 'react-router-dom';
import Button from '../UI/button';
import backBtn from '../../assets/icons/black-arrow.svg';
import FavoriteLocationsContainer from '../containers/favorite-locations-container';
import FavoriteCharactersContainer from '../containers/favorite-characters-container';


const FavoritePage = () => {

  return (
    <main className="favorite-main g-4 mt-5">
      <div className="row row-cols-1 col-md-12 text-center mb-5 align-items-center">
        <NavLink to="/" className="col-md-4 col-sm-12">
          <Button type={'back-btn'}>
            <img src={backBtn} alt="backBtn"/>
            <span className="back-btn-text mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="character-title col-md-4 col-sm-12">Избранное</div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-auto gap-md-0 gap-5">
        <NavLink to="locations">
          <div className="col">
            <img src={favoriteLocations} className="favorite-img-top rounded-3" alt="locations"/>
          </div>
        </NavLink>
        <NavLink to="characters">
          <div className="col">
            <img src={favoriteCharacters} className="favorite-img-top rounded-3" alt="locations"/>
          </div>
        </NavLink>
        <NavLink to="episodes">
          <div className="col">
            <img src={favoriteEpisodes} className="favorite-img-top rounded-3" alt="episodes"/>
          </div>
        </NavLink>
      </div>
      <Routes>
        <Route path="locations" element={<FavoriteLocationsContainer/>}/>
        <Route path="characters" element={<FavoriteCharactersContainer/>}/>
        <Route path="episodes" element={<h1>Favorite episodes</h1>}/>
      </Routes>
    </main>
  );
};

export default FavoritePage;
