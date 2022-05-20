import React, { useEffect, useState } from 'react';
import favoriteLocations from '../assets/backgrounds/favorite-locations.svg';
import favoriteCharacters from '../assets/backgrounds/favorite-characters.svg';
import favoriteEpisodes from '../assets/backgrounds/favorite-episodes.svg';
import { NavLink, Routes, Route } from 'react-router-dom';
import Button from '../components/UI/button';
import backBtn from '../assets/icons/black-arrow.svg';
import FavoriteLocationsContainer from '../components/containers/favorite-locations-container';
import FavoriteCharactersContainer from '../components/containers/favorite-characters-container';
import EpisodesListContainer from '../components/containers/favorite-episodes-container';

const FavoritePage = () => {
  const favoriteConfig = [
    {
      path: 'locations',
      img: favoriteLocations,
      element: <FavoriteLocationsContainer />,
    },
    {
      path: 'characters',
      img: favoriteCharacters,
      element: <FavoriteCharactersContainer />,
    },
    {
      path: 'episodes',
      img: favoriteEpisodes,
      element: <EpisodesListContainer />,
    },
  ];

  return (
    <main className="favorite-main g-4 mt-5">
      <div className="row row-cols-1 col-md-12 text-center mb-5 align-items-center">
        <NavLink to="/" className="col-md-4 col-sm-12">
          <Button type="back-btn">
            <img src={backBtn} alt="back-btn" />
            <span className="mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="page-title col-md-4 col-sm-12">Избранное</div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-auto gap-md-0 gap-5">
        {favoriteConfig.map(({ path, img }) => {
          return (
            <NavLink key={path + Math.random()} to={path}>
              <div className="col">
                <img id={path} src={img} className="favorite-img-top rounded-3" alt={img} />
              </div>
            </NavLink>
          );
        })}
      </div>
      <Routes>
        {favoriteConfig.map(({ path, element }) => {
          return <Route key={path + Math.random()} path={path} element={element} />;
        })}
      </Routes>
    </main>
  );
};

export default FavoritePage;
