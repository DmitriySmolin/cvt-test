import React from 'react';
import { RickandmortyServiceConsumer } from '../rickandmorty-service-context';

const withRickandmortyService = () => (Wrapped) => {
  return (props) => {
    return (
      <RickandmortyServiceConsumer>
        {(rickandmortyService) => {
          return <Wrapped {...props} rickandmortyService={rickandmortyService} />;
        }}
      </RickandmortyServiceConsumer>
    );
  };
};

export default withRickandmortyService;
