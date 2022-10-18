import { Link } from "react-router-dom";

import Card from "../UI/Card";

import classes from "./ProductList.module.css";
import ratingIcon from "../../assets/rating.svg";

const ProductList = (props) => {
  return (
    <div className={classes.products}>
      {props.showProducts.map((product, index) => (
        <Card key={product.id}>
          <img
            src={product.images[0]}
            alt={product.title}
            loading={index < 6 ? "eager" : "lazy"}
            fetchpriority={index < 6 ? "high" : "low"}
          />
          <h3>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <div className={classes.products__summary}>
            <p>
              <b>${product.price}</b>
            </p>
            <p>
              <img src={ratingIcon} height="12px" alt="" />
              <span>{product.rating}</span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
