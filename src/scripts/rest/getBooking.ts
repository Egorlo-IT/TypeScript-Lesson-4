import { Booking } from "../booking.js";

export const getBooking = async (param: Booking) => {
  try {
    const requestOptions = {
      method: "PATCH",
    };
    const response = await fetch(
      `http://localhost:3030/places/${param.id}?&checkInDate=${param.checkInDate}&checkOutDate=${param.checkOutDate}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.name);
  }
};
