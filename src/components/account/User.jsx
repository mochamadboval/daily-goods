import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./User.module.css";

const User = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://dummyjson.com/users/${authCtx.id}`);
      const data = await response.json();

      setUser(data);
      setIsLoading(false);
    };

    fetchUser();
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
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <h3>
          <span>Hi,</span> {user.firstName} {user.lastName}
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
