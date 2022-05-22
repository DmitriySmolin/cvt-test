export const validateEmail = (email) => {
  return email.match(/^(?=.{6,50}@)[_a-z0-9-\+-]+((\.[_a-z0-9-]+))*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
  );
};

export const validatePassword = (password) => {
  return password.match(/^(?=.{6,50})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/);
};

export const validateControl = (value, validation) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.email) {
    isValid = validateEmail(value) && isValid;
  }

  if (validation.password) {
    isValid = validatePassword(value) && isValid;
  }

  return isValid;
};

export const sortArray = (key, key2 = null) => {
  return (a, b) => {
    if (key2) {
      if (a[key][key2] < b[key][key2]) return -1;
      if (a[key][key2] > b[key][key2]) return 1;
      return 0;
    }

    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
};

export const isCheckFavorite = (oldItems = [], newItems = []) => {
  if (oldItems.length === 0) return newItems;

  oldItems.forEach((oldItem) => {
    newItems.forEach((newItem) => {
      if (oldItem.id === newItem.id) {
        newItem.isFavorite = true;
      }
    });
  });

  return newItems;
};

