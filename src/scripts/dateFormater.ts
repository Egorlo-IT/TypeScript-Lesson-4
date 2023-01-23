export const dateFormater = (date: Date, separator: string) => {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  if (+day < 10) {
    day = "0" + day;
  }
  if (+month < 10) {
    month = "0" + month;
  }
  return year + separator + month + separator + day;
};
