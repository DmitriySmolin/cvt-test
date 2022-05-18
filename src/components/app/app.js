import React from 'react';
import './app.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from '../header';
import {connect} from 'react-redux';
import {actionAutoLogin} from '../../redux/actions/action-auth';
import ROUTES from '../../routes/routes';


class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {

    return <div className="container container-md container-xl">
      <BrowserRouter basename="/react-rick-morty">
        <Header/>
        <Routes>
          {ROUTES.map(({path, element}) => {

            if (this.props.isAuth) {
              if (path === '/register')
                return false;
            } else {
              if (path === '/favorites/*')
                return false;
            }

            return <Route key={path + Math.random()} path={path} element={element}/>;

          })}
        </Routes>
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
