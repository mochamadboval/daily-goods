import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  id: "",
  isLoggedIn: false,
  login: (token, id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const user = JSON.parse(localStorage.getItem(`dgUser`));
  let initialToken;
  let initialUserId;

  if (user) {
    initialToken = user.token;
    initialUserId = user.id;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, id) => {
    setToken(token);
    setUserId(id);

    const user = JSON.stringify({
      token,
      id,
    });
    localStorage.setItem("dgUser", user);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("dgUser");
  };

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
