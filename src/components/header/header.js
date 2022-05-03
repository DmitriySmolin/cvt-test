import React from 'react';
import  './header.scss';
import {NavLink} from 'react-router-dom';
import Button from '../UI/button';
import logo from '../../assets/default/logo.svg';

const Header = () => {
  const links = [{
    to: '/',
    label: 'Главная',
    exact: true
  },
    {
      to: '/favorites',
      label: 'Избранное',
      exact: false
    },
    {
      to: '/about',
      label: 'О проекте',
      exact: false
    },
  ];

  const renderLinks = () => {
    return links.map(({to, label, exact}) => {
      return <li className="nav-item" key={label}>
        <NavLink className="nav-link p-2 text-dark" to={to} exact={`${exact}`}>{label}</NavLink>
      </li>;
    });
  };

  return (
    <header className="header row align-items-center mt-3">
      <div className="col-2">
        <NavLink to={'/'} className="navbar-brand d-flex align-items-center">
          <img src={logo} className="d-inline-block align-top" alt="logo" loading="lazy"/>
        </NavLink>
      </div>
      <div className="col-6">
        <nav className="my-2 my-md-0 mr-md-3 navbar-collapse">
          <ul className="nav flex-row">
            {renderLinks()}
          </ul>
        </nav>
      </div>
      <div className="col-4 text-right">
        <NavLink to="/register">
          <Button type="outline-dark">
            Регистрация
          </Button>
        </NavLink>
        <NavLink to="/auth">
          <Button type="dark">
            Войти
          </Button>
        </NavLink>
      </div>
    </header>

  );
};

export default Header;
