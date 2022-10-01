import { Fragment, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const history = useHistory();
  const username = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    authCtx.login(+new Date(), data.id);

    setIsLoading(false);
    // history.replace("/");
  };

  return (
    <Fragment>
      <h2>SIGN UP</h2>
      <form className={classes.account__form} onSubmit={signUpHandler}>
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
        <div>
          <label htmlFor="firstName">
            <b>First Name</b>
          </label>
          <input type="text" id="firstName" ref={firstName} required />
        </div>
        <div>
          <label htmlFor="lastName">
            <b>Last Name</b>
          </label>
          <input type="text" id="lastName" ref={lastName} required />
        </div>
        <div>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="email" id="email" ref={email} required />
        </div>
        {isLoading ? (
          <button disabled>Please wait ...</button>
        ) : (
          <button>Sign Up</button>
        )}
      </form>
    </Fragment>
  );
};

export default SignUpForm;
