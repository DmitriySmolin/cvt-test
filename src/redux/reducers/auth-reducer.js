const initialState = {
  token: null,
  email: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        token: null,
        email: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
