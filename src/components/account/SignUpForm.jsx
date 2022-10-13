import { Fragment, useRef } from "react";

import useAuth from "../../hooks/use-auth";

import Form from "../UI/Form";
import FormInput from "../UI/FormInput";

const SignUpForm = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const { fetchAuth } = useAuth();

  const signUpHandler = (event) => {
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
      <Form name="Sign Up" onSubmit={signUpHandler}>
        <FormInput label="email" name="Email" type="email" ref={email} />
        <FormInput
          label="password"
          name="Password"
          type="password"
          ref={password}
        />
        <FormInput
          label="firstName"
          name="First Name"
          type="text"
          ref={firstName}
        />
        <FormInput
          label="lastName"
          name="Last Name"
          type="text"
          ref={lastName}
        />
      </Form>
    </Fragment>
  );
};

export default SignUpForm;
