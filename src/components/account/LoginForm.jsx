import { Fragment, useRef } from "react";

import useAuth from "../../hooks/use-auth";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const email = useRef();
  const password = useRef();
  const { fetchAuth } = useAuth();

  const loginHandler = (event) => {
    event.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
      returnSecureToken: true,
    };

    fetchAuth(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGfdpzLv7gJqnBtIWyUbJESHfDCOpvZi8",
      user
    );
  };

  return (
    <Fragment>
      <h2>LOGIN</h2>
      <form className={classes.account__form} onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="text" id="email" ref={email} required />
        </div>
        <div>
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input type="password" id="password" ref={password} required />
        </div>
        <button>Login</button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
