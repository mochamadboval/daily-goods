import { Link } from "react-router-dom";

import Card from "../UI/Card";

import classes from "./ProductList.module.css";
import ratingIcon from "../../assets/rating.svg";

const ProductList = (props) => {
  const productsLength = props.showProducts.length;

  return (
    <div className={classes.products}>
      {props.showProducts.map((product) => (
        <Card key={product.id}>
          <img
            src={product.images[0]}
            alt={product.title}
            loading={productsLength <= 18 ? "eager" : "lazy"}
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
