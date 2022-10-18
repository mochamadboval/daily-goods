import { Fragment, useRef } from "react";

import useAuth from "../../hooks/use-auth";

// import SEO from "../SEO";
import Form from "../UI/Form";
import FormInput from "../UI/FormInput";

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
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        import.meta.env.VITE_API_KEY
      }`,
      user
    );
  };

  return (
    <Fragment>
      {/* <SEO
        title="Login"
        description="Login page of Daily Goods."
        page="account"
      /> */}
      <h2>LOGIN</h2>
      <Form name="Login" onSubmit={loginHandler}>
        <FormInput label="email" name="Email" type="email" ref={email} />
        <FormInput
          label="password"
          name="Password"
          type="password"
          ref={password}
        />
      </Form>
    </Fragment>
  );
};

export default LoginForm;
