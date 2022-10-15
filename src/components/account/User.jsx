import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import ProductsContext from "../../store/products-context";

import classes from "./User.module.css";

import profileIcon from "../../assets/profile.jpg";

const User = () => {
  const authCtx = useContext(AuthContext);
  const productsCtx = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    productsCtx.loadCart();

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.users[0]);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = () => {
    authCtx.logout();
  };

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <h2>Profile</h2>
      <section className={classes.user}>
        <img src={profileIcon} alt={user.displayName} />
        <h3>
          <span>Hi,</span> {user.displayName}
        </h3>
        <p>{user.email}</p>
      </section>
      <button className={classes.logout} onClick={logoutHandler}>
        Logout
      </button>
    </Fragment>
  );
};

export default User;
