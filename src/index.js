import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './components/app';
import RickandmortyService from './services/rickandmorty-service';
import {Provider} from 'react-redux';
import store from './store';
import ErrorBoundry from './components/error-boundry';
import {RickandmortyServiceProvider} from './components/rickandmorty-service-context';
import Layout from './components/hoc/layout';

const rickandmortyService = new RickandmortyService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <RickandmortyServiceProvider value={rickandmortyService}>
          <Layout>
            <App/>
          </Layout>
        </RickandmortyServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>
);
