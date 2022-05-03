const actionAuth = (email, password, isLogin) => {
  return async dispatch => {

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxJxjeaCWXkupSy9aRd6HML5GEnMddF4U';
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxJxjeaCWXkupSy9aRd6HML5GEnMddF4U';
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(authData)
    });

    const data = await res.json();

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(actionAuthSuccess(data.idToken));
    dispatch(actionAutoLogout(data.expiresIn));
  };
};

const actionAutoLogout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(actionAuthLogout());
    }, time * 1000);
  };
};

const actionAuthLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: 'AUTH_LOGOUT'
  };
};


const actionAuthSuccess = (token) => {
  return {
    type: 'AUTH_SUCCESS',
    payload: token
  };
};

export {actionAuth, actionAuthSuccess, actionAutoLogout};
