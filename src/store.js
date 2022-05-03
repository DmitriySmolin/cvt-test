import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import rootReducer from './redux/reducers/root-reducer';
import thunkMiddleware from 'redux-thunk';


const logMiddleware = ({getState}) => (next) => (action) => {
  console.log(action.type, getState());
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

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));


export default store;
