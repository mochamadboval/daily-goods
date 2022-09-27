import classes from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={classes.pagination}>
      <button onClick={props.onDecrease}>Prev</button>
      <button onClick={props.onIncrease}>Next</button>
    </div>
  );
};

export default Pagination;
