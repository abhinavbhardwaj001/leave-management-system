/** * get current user session */
export const getUser = () => JSON.parse(localStorage.getItem("user"));

/** * save user session */
export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));

/** * clear session on logout */
export const clearUser = () => localStorage.removeItem("user");