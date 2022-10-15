import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <article className={`${classes.card} ${props.classes}`}>
      {props.children}
    </article>
  );
};

export default Card;
