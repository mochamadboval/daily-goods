import firebase from "../firebase";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import ProductsContext from "../store/products-context";

import useFetch from "../hooks/use-fetch";

import Card from "../components/UI/Card";
// import SEO from "../components/SEO";

import classes from "./Cart.module.css";

const Cart = () => {
  const authCtx = useContext(AuthContext);
  const productsCtx = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data, isLoading } = useFetch(
    `https://daily-goods-4869-default-rtdb.asia-southeast1.firebasedatabase.app/cart-${authCtx.id}.json`
  );

  useEffect(() => {
    const cart = [];
    let total = 0;

    for (const key in data) {
      cart.unshift(data[key]);

      total += data[key].item * data[key].price;
    }

    setProducts(cart);
    setTotalPrice(total);
  }, [data]);

  const changeItemHandler = (productId, isIncrease) => {
    const productRef = firebase.database().ref(`/cart-${authCtx.id}`);
    productRef.once("value", (snapshot) => {
      const products = snapshot.val();

      for (const key in products) {
        if (products[key].id === productId) {
          if (isIncrease) {
            productRef.child(key).update({ item: (products[key].item += 1) });
            productsCtx.increaseCart();
            productsCtx.changeTotalPrice(true, products[key].price);
          } else {
            productRef.child(key).update({ item: (products[key].item -= 1) });
            productsCtx.decreaseCart();
            productsCtx.changeTotalPrice(false, products[key].price);

            if (products[key].item === 0) {
              productRef.child(key).remove();
            }
          }
        }
      }
    });
  };

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      {/* <SEO title="Cart" description="Cart page of Daily Goods." page="cart" /> */}
      <h2 className="page-title">Cart</h2>
      {products.length !== 0 ? (
        <div className={classes.products}>
          {products.map((product) => (
            <Card key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className={classes.product}>
                <p className={classes.product__brand}>
                  <b>{product.brand}</b>
                </p>
                <h3>{product.title}</h3>
                <p>
                  <b>${product.price * product.item}</b>
                </p>
                <p className={classes.product__item}>Item:</p>
                <div className={classes.product__amount}>
                  <button onClick={() => changeItemHandler(product.id, false)}>
                    -
                  </button>
                  <p>{product.item}</p>
                  <button onClick={() => changeItemHandler(product.id, true)}>
                    +
                  </button>
                </div>
              </div>
            </Card>
          ))}
          <Card>
            <p>Total</p>
            <p>${totalPrice}</p>
          </Card>
        </div>
      ) : (
        <p className="loading">No products.</p>
      )}
    </Fragment>
  );
};

export default Cart;
