import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const useAuth = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const fetchAuth = (url, user) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expiration = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, data.localId, expiration.toISOString());
        history.replace("/account");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { fetchAuth };
};

export default useAuth;
