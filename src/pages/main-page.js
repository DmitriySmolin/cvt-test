import React from 'react';
import characterImg from '../assets/backgrounds/characters.svg';
import locationImg from '../assets/backgrounds/locations.svg';
import episodeImg from '../assets/backgrounds/episodes.svg';
import { NavLink } from 'react-router-dom';

const MainPage = () => {
  const mainMenu = [
    {
      path: '/characters',
      img: characterImg,
      title: 'Персонажи',
      text: 'Зайди и познакомься со всеми персонажами вселенной',
    },
    {
      path: '/locations',
      img: locationImg,
      title: 'Локации',
      text: 'Исследуй все локации. Давай же, не будь занудой!',
    },
    {
      path: '/episodes',
      img: episodeImg,
      title: 'Эпизоды',
      text: 'Узнай чуть больше о карте приключений Рика и Морти',
    },
  ];

  return (
    <main className="row row-cols-1 row-cols-md-3 g-4 mt-5">
      {mainMenu.map(({ path, img, title, text }) => {
        return (
          <NavLink key={path + Math.random()} to={path}>
            <div className="col">
              <div className="main-card card h-100 p-3 mb-3">
                <img src={img} className="card-img-top rounded-3" alt={img} />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text mt-4">{text}</p>
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </main>
  );
};

export default MainPage;
