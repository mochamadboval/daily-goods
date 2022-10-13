import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      {props.children}
      <button>{props.name}</button>
    </form>
  );
};

export default Form;
