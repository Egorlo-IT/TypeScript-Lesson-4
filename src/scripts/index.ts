import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { getUserData } from "./getUserData.js";
import { getFavoritesAmount } from "./getFavoritesAmount.js";

const checkinDefault = new Date();
const checkoutDefault = new Date();

checkinDefault.setDate(checkinDefault.getDate() + 1);
checkoutDefault.setDate(checkinDefault.getDate() + 2);

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock("Chica", "/img/avatar.png", +getFavoritesAmount());
  renderSearchFormBlock(checkinDefault, checkoutDefault);
  renderSearchStubBlock();
  getUserData();
  getFavoritesAmount();
});
