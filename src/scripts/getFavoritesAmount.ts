export const getFavoritesAmount = () => {
  const favoritesAmount: number = JSON.parse(
    localStorage.getItem("favoriteItems")
  )?.length;

  if (favoritesAmount == null) {
    return favoritesAmount + "";
  }
  return favoritesAmount;
};
