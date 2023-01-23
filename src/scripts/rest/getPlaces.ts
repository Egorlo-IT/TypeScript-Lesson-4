import { Place } from "../place.js";

export const getPlaces = async (param: Place) => {
  try {
    const response = await fetch(
      `http://localhost:3030/places?coordinates=${param.coordinates}&checkInDate=${param.checkInDate}&checkOutDate=${param.checkOutDate}&maxPrice=${param.priceLimit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.name);
  }
};
