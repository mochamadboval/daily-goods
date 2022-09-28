import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./Product.module.css";

import wishlistIcon from "../assets/wishlist.svg";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const params = useParams();
  const { productId } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();

      setProduct(data);
      setIsLoading(false);
    };

    fetchProduct();
  }, []);

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <article className={classes.product}>
      <div className={classes.product__images}>
        {product.images.map((image) => (
          <figure key={image}>
            <img src={image} alt={product.title} loading="lazy" />
          </figure>
        ))}
      </div>
      <div className={classes.product__detail}>
        <div className={classes.product__wishlist}>
          <p>
            <b>${product.price}</b>
          </p>
          <img src={wishlistIcon} height="24px" alt="" />
        </div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <aside className={classes.product__info}>
          <section>
            <h3>Rating</h3>
            <p>{product.rating}</p>
          </section>
          <section>
            <h3>Stock</h3>
            <p>{product.stock}</p>
          </section>
          <section>
            <h3>Brand</h3>
            <p>{product.brand}</p>
          </section>
          <section>
            <h3>Category</h3>
            <p>
              <Link to={`/categories/${product.category}`}>
                {product.category.replace("-", " ")}
              </Link>
            </p>
          </section>
        </aside>
      </div>
    </article>
  );
};

export default Product;
