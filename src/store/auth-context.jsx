import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  id: "",
  isLoggedIn: false,
  login: (token, id, expiration) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const user = JSON.parse(localStorage.getItem("dgUser"));
  let initialToken;
  let initialUserId;
  let initialExpiration = 0;

  if (user) {
    initialToken = user.token;
    initialUserId = user.id;
    initialExpiration = user.expiration;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("dgUser");
  };

  const loginHandler = (token, id, expiration) => {
    setToken(token);
    setUserId(id);

    const user = JSON.stringify({
      token,
      id,
      expiration: new Date(expiration).getTime(),
    });
    localStorage.setItem("dgUser", user);
  };

  const currentTime = new Date().getTime();
  const remainingTime = initialExpiration - currentTime;

  setTimeout(() => {
    logoutHandler();
  }, remainingTime);

  const contextValue = {
    token,
    id: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
