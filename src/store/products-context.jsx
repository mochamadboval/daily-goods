import firebase from "../firebase";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";

const ProductsContext = React.createContext({
  cart: 0,
  limit: 0,
  totalPrice: 0,
  loadCart: () => {},
  increaseCart: () => {},
  decreaseCart: () => {},
  increaseLimit: (limit) => {},
  changeTotalPrice: () => {},
});

export const ProductsContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [cart, setCart] = useState(0);
  const [limit, setLimit] = useState(18);
  const [totalPrice, setTotalPrice] = useState(0);

  const loadCart = () => {
    const productRef = firebase.database().ref(`/cart-${authCtx.id}`);
    productRef.once("value", (snapshot) => {
      const products = snapshot.val();

      if (products === null) {
        return;
      }
      const productsLength = Object.keys(products).length;

      if (productsLength !== 0) {
        let cartItems = 0;

        for (const key in products) {
          cartItems += products[key].item;
        }

        setCart(cartItems);
      }
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseCart = () => {
    setCart((prevState) => prevState + 1);
  };

  const decreaseCart = () => {
    setCart((prevState) => prevState - 1);
  };

  const increaseLimit = (limit) => {
    setLimit(limit);
  };

  const changeTotalPrice = (isAdded, price) => {
    setTotalPrice((prevState) => {
      if (isAdded) {
        return prevState + price;
      } else {
        return prevState - price;
      }
    });
  };

  const contextValue = {
    cart,
    limit,
    totalPrice,
    loadCart,
    increaseCart,
    decreaseCart,
    increaseLimit,
    changeTotalPrice,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
