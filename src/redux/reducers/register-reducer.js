import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../action-types/action-types';

const initialState = {
  success: null,
  error: null,
};

const registerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
