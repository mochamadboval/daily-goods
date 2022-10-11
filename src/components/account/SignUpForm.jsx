import { Fragment, useRef } from "react";

import useAuth from "../../hooks/use-auth";

import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const { fetchAuth } = useAuth();

  const signUpHandler = async (event) => {
    event.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
      displayName: firstName.current.value + " " + lastName.current.value,
      returnSecureToken: true,
    };

    fetchAuth(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        import.meta.env.VITE_API_KEY
      }`,
      user
    );
  };

  return (
    <Fragment>
      <h2>SIGN UP</h2>
      <form className={classes.account__form} onSubmit={signUpHandler}>
        <div>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="email" id="email" ref={email} required />
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
        <button>Sign Up</button>
      </form>
    </Fragment>
  );
};

export default SignUpForm;
