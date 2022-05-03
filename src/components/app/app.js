import React from 'react';
import './app.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from '../header';
import Auth from '../auth';
import Register from '../register';
import {AboutPage, FavoritePage, MainPage} from '../pages';
import CharactersList from '../characters-list';
import LocationsList from '../locations-list';
import EpisodesList from '../episodes-list';


const App = () => {
  return <div className="container">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/favorites" element={<FavoritePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/characters" element={<CharactersList/>}/>
        <Route path="/locations" element={<LocationsList/>}/>
        <Route path="/episodes" element={<EpisodesList/>}/>
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
