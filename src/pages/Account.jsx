import { Fragment, useContext, useState } from "react";
import AuthContext from "../store/auth-context";

import LoginForm from "../components/account/LoginForm";
import SignUpForm from "../components/account/SignUpForm";
import User from "../components/account/User";

import classes from "./Account.module.css";

const Account = () => {
  const authCtx = useContext(AuthContext);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchFormHandler = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  return (
    <div className={classes.account}>
      <article>
        {!authCtx.isLoggedIn && (
          <Fragment>
            {isLoginForm && <LoginForm />}
            {!isLoginForm && <SignUpForm />}
            <p>or</p>
            <button
              className={classes["switch-button"]}
              onClick={switchFormHandler}
            >
              {isLoginForm ? "Create Account" : "Login"}
            </button>
          </Fragment>
        )}
        {authCtx.isLoggedIn && (
          <Fragment>
            <User />
          </Fragment>
        )}
      </article>
    </div>
  );
};

export default Account;
