import { useRef } from "react";

import classes from "./Account.module.css";

const Account = () => {
  const username = useRef(null);
  const password = useRef(null);

  const loginHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <div className={classes.account}>
      <article>
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
          <button>Login</button>
        </form>
      </article>
    </div>
  );
};

export default Account;
