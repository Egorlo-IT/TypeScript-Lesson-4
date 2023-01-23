import { SearchFormData } from "./searchFormData.js";
import { Place } from "./place.js";
import { getPlaces } from "./rest/getPlaces.js";
import {
  renderSearchResultsBlockHeader,
  renderEmptyOrErrorSearchBlock,
  appendRenderSearchResultBlockBodyHomy,
  appendRenderSearchResultBlockBodyFlatRent,
} from "./search-results.js";
import { renderToast } from "./lib.js";
import { FlatRentSdk } from "./flat-rent-sdk.js";

export let bookingPossible = true;

export const search = async (entity: SearchFormData, param: Place) => {
  const sdkFlatRentSdk = new FlatRentSdk();
  bookingPossible = true;
  renderSearchResultsBlockHeader();

  entity.provider.forEach(async (item: HTMLFormElement) => {
    switch (item.value) {
      case "homy": {
        if (item.checked) {
          const data = await getPlaces(param);
          if (
            data?.length !== 0 &&
            !data?.error &&
            data?.name !== "Error" &&
            data?.name !== "BadRequest"
          ) {
            appendRenderSearchResultBlockBodyHomy(".results-list", data);
          } else {
            if (data?.length === 0) {
              renderEmptyOrErrorSearchBlock(
                "По выбранным критериям поиска нет предложений"
              );
            } else {
              console.log("Error:", data);
              renderEmptyOrErrorSearchBlock(`Error: ${data?.message}`);
            }
          }
        }
        break;
      }
      case "flat-rent": {
        if (item.checked) {
          const dataSDK = {
            city: param.city,
            checkInDate: new Date(param.checkInDate),
            checkOutDate: new Date(param.checkOutDate),
            priceLimit: param.priceLimit,
          };
          const response = await sdkFlatRentSdk.search(dataSDK);
          const result = await response;

          if (result?.length !== 0) {
            appendRenderSearchResultBlockBodyFlatRent(".results-list", result);
          } else {
            renderEmptyOrErrorSearchBlock(
              "По выбранным критериям поиска нет предложений"
            );
          }
        }

        break;
      }
      default:
        break;
    }
    const timerId = setTimeout(() => {
      renderToast(
        {
          text: "Информация устарела. Обновите данные поиска",
          type: "warning",
        },
        {
          name: "Понял",
          handler: () => {
            console.log("Уведомление закрыто");
          },
        }
      );
      bookingPossible = false;
      clearTimeout(timerId);
    }, 300000);
  });
};
