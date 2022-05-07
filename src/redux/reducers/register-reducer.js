const initialState = {
  success: null,
  error: null
};

const registerReducer = (state = initialState, action) => {


  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        success: action.payload,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default registerReducer;
