import { renderBlock } from "./lib.js";

export const renderUserBlock = (
  userName: string,
  linkAvatar: string,
  favoriteItemsAmount: number
) => {
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  /* eslint-disable indent */
  renderBlock(
    "user-block",
    `
        <div class="header-container">
      <img class="avatar" src="/img/avatar.png" alt="Wade Warren" />
      <div class="info">
          <p class="name">Wade Warren</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
};
