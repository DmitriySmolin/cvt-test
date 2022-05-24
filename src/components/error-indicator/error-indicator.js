import React from 'react';
import './error-indicator.module.scss';
import notFoundImg from '../../assets/backgrounds/404.svg';
import Button from '../UI/button';
import homeIcon from '../../assets/icons/home.svg';
import { NavLink } from 'react-router-dom';

const ErrorIndicator = () => {
  return (
    <div className="row d-flex justify-content-center align-items-center mt-5 text-center">
      <div className="col-md-8">
        <img className="error-not-found" src={notFoundImg} alt="error-not-found" />
      </div>
      <div className="error-indicator-title col-md-8 mt-5">Упс. Кажется вы заблудились. Только без паники!</div>
      <div className="error-indicator-text col-md-8 mt-3">
        Страница, которую вы ищите не существует, либо была удалена
      </div>
      <div className="error-indicator-text col-md-8 mt-5">
        <NavLink to="/">
          <Button type="btn-home">
            <img src={homeIcon} alt="plus" />
            <span className="btn-home-text">Домой</span>
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
export default ErrorIndicator;
