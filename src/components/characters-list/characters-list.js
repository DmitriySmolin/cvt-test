import React from 'react';
import './characters-list.module.scss';
import {connect} from 'react-redux';
import withRickandmortyService from '../hoc';

class CharactersList extends React.Component {
  componentDidMount() {
    const {rickandmortyService} = this.props
    const data = rickandmortyService.getAllCharacters();
   console.log(data)
  }

  render() {
    return (
      <div>
        CharactersList
      </div>
    );
  }
}

const mapStateToProps = ({characters}) => {
  return {characters};
};

export default withRickandmortyService()(connect(mapStateToProps)(CharactersList));
