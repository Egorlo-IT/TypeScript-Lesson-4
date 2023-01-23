export const getUserData = () => {
  const user: unknown = localStorage.getItem("user");

  if (user == null) {
    return user + "";
  }
  return user;
};
