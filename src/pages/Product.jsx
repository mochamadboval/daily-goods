import firebase from "../firebase";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import ProductsContext from "../store/products-context";

import useFetch from "../hooks/use-fetch";
import useWishlist from "../hooks/use-wishlist";

import SEO from "../components/SEO";

import classes from "./Product.module.css";
import wishlistIcon from "../assets/wishlist.svg";
import wishlistedIcon from "../assets/wishlisted.svg";

const Product = () => {
  const params = useParams();
  const { productId } = params;

  const authCtx = useContext(AuthContext);
  const productsCtx = useContext(ProductsContext);
  const { data: product, isLoading } = useFetch(
    `https://dummyjson.com/products/${productId}`
  );
  const { isWishlisted, wishlistHandler } = useWishlist(
    authCtx.id,
    productId,
    product
  );

  const addToCartHandler = () => {
    const productRef = firebase.database().ref(`/cart-${authCtx.id}`);
    productRef.once("value", (snapshot) => {
      const products = snapshot.val();

      for (const key in products) {
        if (products[key].id === product.id) {
          productRef.child(key).update({ item: (products[key].item += 1) });
          productsCtx.increaseCart();
          return;
        }
      }

      const productToCart = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        brand: product.brand,
        item: 1,
      };
      productRef.push(productToCart);
      productsCtx.increaseCart();
    });
  };

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <article className={classes.product}>
      <SEO
        title={product.title}
        description={`${product.title} page of Daily Goods.`}
        page={`product/${productId}`}
      />
      <div className={classes.product__images}>
        {product.images.map((image, index) => (
          <figure key={image}>
            <img
              src={image}
              alt={product.title}
              loading="lazy"
              fetchpriority={index < 1 ? "high" : "low"}
            />
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
        {authCtx.isLoggedIn && (
          <button onClick={addToCartHandler}>
            <strong>Add to Cart</strong>
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;
