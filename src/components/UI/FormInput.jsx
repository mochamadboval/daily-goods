import { forwardRef } from "react";

import classes from "./FormInput.module.css";

const FormInput = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.label}>
        <b>{props.name}</b>
      </label>
      <input type={props.type} id={props.label} ref={ref} required />
    </div>
  );
});

export default FormInput;
