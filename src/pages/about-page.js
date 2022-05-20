import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/UI/button';
import backBtn from '../assets/icons/black-arrow.svg';

const AboutPage = () => {
  return (
    <main className="favorite-main g-4 mt-5">
      <div className="row row-cols-1 col-md-12 text-center mb-5 align-items-center">
        <NavLink to="/" className="col-md-4 col-sm-12">
          <Button type="back-btn">
            <img src={backBtn} alt="back-btn" />
            <span className="mx-2">Назад</span>
          </Button>
        </NavLink>
        <div className="page-title col-md-4 col-sm-12">О проекте</div>
        <div className="about-text d-flex flex-column justify-content-center align-items-center px-2 mt-5 ">
          <p>
            Данный проект создан по мотивам приключений Рика и Морти. Здесь вы можете поближе познакомиться со всеми
            персонажами, эпизодами и локациями данного мультсериала.
          </p>
          <p>
            Проект является тестовым заданием для входящих кандидатов пула Frontend. В зависимости от грейда кандидата
            необходимо выполнить соответствующий список заданий. Желаем удачи!
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
