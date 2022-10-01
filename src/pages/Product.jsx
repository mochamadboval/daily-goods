import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";

import classes from "./Product.module.css";

import wishlistIcon from "../assets/wishlist.svg";
import wishlistedIcon from "../assets/wishlisted.svg";

const Product = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
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

    let isProductWishlisted = JSON.parse(
      localStorage.getItem(`dgWishlist${authCtx.id}`)
    );
    if (isProductWishlisted === null || isProductWishlisted.length === 0) {
      return;
    }

    let filteredProduct = isProductWishlisted.filter(
      (item) => item.id.toString() === productId
    );
    if (filteredProduct.length !== 0) {
      setIsWishlisted(true);
    }
  }, []);

  const wishlistHandler = () => {
    let savedWishlist = JSON.parse(
      localStorage.getItem(`dgWishlist${authCtx.id}`)
    );
    if (savedWishlist === null) {
      savedWishlist = [];
    }

    const filteredWishlist = savedWishlist.filter(
      (item) => item.id === product.id
    );

    if (filteredWishlist.length === 0) {
      savedWishlist.push(product);

      setIsWishlisted(true);
    } else {
      const filtered = savedWishlist.filter((item) => item.id !== product.id);
      savedWishlist = filtered;

      setIsWishlisted(false);
    }

    localStorage.setItem(
      `dgWishlist${authCtx.id}`,
      JSON.stringify(savedWishlist)
    );
  };

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
          {authCtx.isLoggedIn && (
            <button onClick={wishlistHandler}>
              <img
                src={isWishlisted ? wishlistedIcon : wishlistIcon}
                height="24px"
                alt=""
              />
            </button>
          )}
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
