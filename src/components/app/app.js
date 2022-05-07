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
import {connect} from 'react-redux';
import Logout from '../logout';
import {actionAutoLogin} from '../../redux/actions/action-auth';


class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/main" element={<MainPage/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/characters" element={<CharactersList/>}/>
      <Route path="/locations" element={<LocationsList/>}/>
      <Route path="/episodes" element={<EpisodesList/>}/>
    </Routes>;

    if (this.props.isAuth) {
      routes = <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/favorites" element={<FavoritePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/characters" element={<CharactersList/>}/>
        <Route path="/locations" element={<LocationsList/>}/>
        <Route path="/episodes" element={<EpisodesList/>}/>
      </Routes>;

    }

    return <div className="container">
      <BrowserRouter>
        <Header/>
        {routes}
      </BrowserRouter>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actionAutoLogin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
;
