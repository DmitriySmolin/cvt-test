export const actionAuth = (email, password, isLogin, remember) => {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxJxjeaCWXkupSy9aRd6HML5GEnMddF4U';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(authData),
      });

      const data = await res.json();
      if (res.ok) {

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        if (remember) {
          localStorage.setItem('token', data.idToken);
          localStorage.setItem('userId', data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('email', data.email);
        }

        dispatch(actionAuthSuccess(data.idToken, data.email));
        dispatch(actionAutoLogout(data.expiresIn));
      } else {
        dispatch(actionAuthFailure(data.error));
        setTimeout(() => {
          dispatch(actionAuthFailure(''));
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const actionAutoLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actionAuthLogout());
    }, time * 1000);
  };
};

export const actionAuthLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('email');
  return {
    type: 'AUTH_LOGOUT',
  };
};

export const actionAutoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token) {
      dispatch(actionAuthLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(actionAuthLogout());
      } else {
        dispatch(actionAuthSuccess(token, email));
        dispatch(actionAutoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

export const actionAuthSuccess = (token, email) => {
  return {
    type: 'AUTH_SUCCESS',
    payload: { token, email },
  };
};

export const actionAuthFailure = (error) => {
  return {
    type: 'AUTH_FAILURE',
    payload: error,
  };
};
