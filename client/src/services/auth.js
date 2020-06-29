export const USER = "USER";

export const isAuthenticated = () => localStorage.getItem(USER) !== null;

export const getUser = () => JSON.parse(localStorage.getItem(USER));

export const getToken = () => {
  const user = getUser();

  if (user) {
    return user.token;
  }

  return null;
}

export const login = user => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(USER);
};
