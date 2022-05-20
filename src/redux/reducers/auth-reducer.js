import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from '../action-types/action-types';

const initialState = {
  token: null,
  email: null,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        email: payload.email,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        email: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
