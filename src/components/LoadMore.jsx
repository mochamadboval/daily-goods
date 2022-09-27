import classes from "./LoadMore.module.css";

const LoadMore = (props) => {
  return (
    <div className={classes["load-more"]}>
      <button onClick={props.onIncrease}>Load more</button>
    </div>
  );
};

export default LoadMore;
