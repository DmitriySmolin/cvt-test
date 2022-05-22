const actionRegister = (email, password) => {

  return async (dispatch) => {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxJxjeaCWXkupSy9aRd6HML5GEnMddF4U';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    try {
      const data = await res.json();
      if (res.ok) {
        dispatch(actionRegisterSuccess(true));
        setTimeout(() => {
          dispatch(actionRegisterSuccess(false));
        }, 5000);
      } else {
        dispatch(actionRegisterFailure(data.error));
        setTimeout(() => {
          dispatch(actionRegisterFailure(''));
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const actionRegisterSuccess = (success) => {
  return {
    type: 'REGISTER_SUCCESS',
    payload: success,
  };
};

const actionRegisterFailure = (error) => {
  return {
    type: 'REGISTER_FAILURE',
    payload: error,
  };
};

export { actionRegister };
