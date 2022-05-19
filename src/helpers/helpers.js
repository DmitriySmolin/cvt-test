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
