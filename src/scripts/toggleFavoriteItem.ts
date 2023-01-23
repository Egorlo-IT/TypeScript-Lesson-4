import { getFavoritesAmount } from "./getFavoritesAmount.js";
import { renderUserBlock } from "./user.js";

export const toggleFavoriteItem = () => {
  let favoriteItemsMerged = [];
  const elResultsList = document.querySelector(".results-list");
  elResultsList.querySelectorAll(".favorites").forEach((item) => {
    item.addEventListener("click", (event: Event) => {
      const { target } = event;
      (target as HTMLDivElement)?.classList.toggle("active");
      const favoriteItemName = (target as HTMLDivElement)?.parentElement
        .parentElement.lastElementChild.firstElementChild.firstElementChild
        .textContent;

      const favoriteItemImage = (target as HTMLDivElement)?.parentElement
        .lastElementChild["src"];
      const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems"));

      if (favoriteItems?.length) {
        const found = favoriteItems.find(
          (item: { name: string }) => item.name === favoriteItemName
        );

        if (found) {
          favoriteItemsMerged = favoriteItems.filter(
            (item) => item.name !== favoriteItemName
          );
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        } else {
          favoriteItemsMerged = [
            ...favoriteItems,
            ...[
              {
                id: favoriteItems[favoriteItems.length - 1].id + 1,
                name: favoriteItemName,
                img: favoriteItemImage,
              },
            ],
          ];
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(favoriteItemsMerged)
          );
        }
      } else {
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify([
            {
              id: 1,
              name: favoriteItemName,
              img: favoriteItemImage,
            },
          ])
        );
      }
      renderUserBlock("Chica", "/img/avatar.png", +getFavoritesAmount());
    });
  });
};
