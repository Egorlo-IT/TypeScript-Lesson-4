import { renderBlock } from "./lib.js";
import { dateFormater } from "./dateFormater.js";
import { search } from "./search.js";

export const renderSearchFormBlock = (checkin: Date, checkout: Date) => {
  const minDate = new Date();
  let maxDateFormatted: string;

  minDate.setDate(checkin.getDate() - 1);

  if (+checkin.getMonth() === 11) {
    const maхDate = new Date(checkin.getFullYear() + 1, 0, 1);
    maxDateFormatted = dateFormater(maхDate, "-");
  } else {
    const checkinMaх = new Date(checkin.getFullYear(), checkin.getMonth() + 2);
    maxDateFormatted = dateFormater(checkinMaх, "-");
  }

  const checkinDefaulFormatted = dateFormater(checkin, "-");
  const checkoutDefaulFormatted = dateFormater(checkout, "-");
  const minDateFormatted = dateFormater(minDate, "-");

  document.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const elCity = document.getElementById("city");

    const { target } = event;
    const checkin = (target as HTMLFormElement)?.checkin.value
      ? (target as HTMLFormElement)?.checkin.value
      : null;
    const checkout = (target as HTMLFormElement)?.checkout.value
      ? (target as HTMLFormElement)?.checkout.value
      : null;
    const price = (target as HTMLFormElement)?.price.value
      ? (target as HTMLFormElement)?.price.value
      : null;

    const provider = (target as HTMLFormElement)?.provider;

    const searchData = {
      provider: provider,
      checkin: checkin,
      checkout: checkout,
      priceLimit: price,
    };

    const place = {
      city: (elCity as HTMLFormElement).value,
      coordinates: "59.9386,30.3141",
      checkInDate: new Date(checkin).getTime(),
      checkOutDate: new Date(checkout).getTime(),
      priceLimit: price,
    };

    if (searchData !== null) {
      search(searchData, place);
    }
  });

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkinDefaulFormatted} min=${minDateFormatted} max=${maxDateFormatted} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkoutDefaulFormatted}  min=${minDateFormatted} max=${maxDateFormatted} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="number" min="0" max="5000000.0" step="100" value="0" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
};
