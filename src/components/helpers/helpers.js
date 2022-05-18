export const sortArray = (key, key2 = null) => {

  return function (a, b) {

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
