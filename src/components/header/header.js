import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import Button from '../UI/button';
import logo from '../../assets/default/logo.svg';
import { connect } from 'react-redux';

const Header = (props) => {
  let links = [
    {
      to: '/',
      label: 'Главная',
      exact: true,
    },
    {
      to: '/about',
      label: 'О проекте',
      exact: false,
    },
  ];

  if (props.isAuth) {
    links = [
      ...links.slice(0, 1),
      {
        to: '/favorites',
        label: 'Избранное',
        exact: false,
      },
      ...links.slice(1),
    ];
  }

  const renderLinks = (links) => {
    return links.map(({ to, label, exact }) => {
      return (
        <li className="nav-item" key={label}>
          <NavLink className="nav-link p-2 text-dark" to={to} exact={`${exact}`}>
            {label}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <header className="header row align-items-center mt-3 ">
      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-2 d-flex justify-content-center">
        <NavLink to={'/'} className="navbar-brand d-flex align-items-center">
          <img src={logo} className="d-inline-block align-top" alt="logo" loading="lazy" />
        </NavLink>
      </div>
      <div className="col-lg-5 col-md-6 col-sm-12 col-xs-2 d-flex ">
        <nav className="my-2 my-md-0 mr-md-3 navbar-collapse">
          <ul className="nav flex-md-row flex-column align-items-center ">{renderLinks(links)}</ul>
        </nav>
      </div>
      <div className="col-lg-5 col-md-4 col-sm-12 d-flex flex-md-row justify-content-lg-end justify-content-md-end flex-column align-items-center gap-3 ">
        {!props.isAuth ? (
          <NavLink to="/register">
            <Button type="outline-dark" width="header-button-register">
              Регистрация
            </Button>
          </NavLink>
        ) : (
          <span>{props.email}</span>
        )}
        {props.isAuth ? (
          <NavLink to="/logout">
            <Button type="outline-dark" width="header-button-logout">
              Выйти
            </Button>
          </NavLink>
        ) : (
          <NavLink to="/auth">
            <Button type="dark" width="header-button-login">
              Войти
            </Button>
          </NavLink>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token,
    email: state.auth.email,
  };
};

export default connect(mapStateToProps)(Header);
