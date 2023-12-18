"use client";

const getAuthenticatedUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage?.getItem("loggedUser")
    if (user) {
      return JSON.parse(user)
    }
    return user
}
};

const auth = {
  getAuthenticatedUser,
};

export default auth;
