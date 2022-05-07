import React from 'react';
import {connect} from 'react-redux';
import {actionAuthLogout} from '../../redux/actions/action-auth';
import {Navigate} from 'react-router-dom';

class Logout extends React.Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Navigate to="/"/>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionAuthLogout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
