import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import rootReducer from './redux/reducers/root-reducer';
import thunkMiddleware from 'redux-thunk';


const logMiddleware = ({getState}) => (next) => (action) => {
  return next(action);
};

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
};

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)));


export default store;
