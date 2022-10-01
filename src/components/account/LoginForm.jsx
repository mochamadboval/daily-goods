import { Fragment, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const history = useHistory();
  const username = useRef();
  const password = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    });
    const data = await response.json();
    authCtx.login(data.token, data.id);

    setIsLoading(false);
    // history.replace("/");
  };

  return (
    <Fragment>
      <h2>LOGIN</h2>
      <form className={classes.account__form} onSubmit={loginHandler}>
        <div>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input type="text" id="username" ref={username} required />
        </div>
        <div>
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input type="password" id="password" ref={password} required />
        </div>
        {isLoading ? (
          <button disabled>Please wait ...</button>
        ) : (
          <button>Login</button>
        )}
      </form>
    </Fragment>
  );
};

export default LoginForm;
