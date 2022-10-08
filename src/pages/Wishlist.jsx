import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";

import useFetch from "../hooks/use-fetch";

import ProductList from "../components/products/ProductList";

const Wishlist = () => {
  const authCtx = useContext(AuthContext);
  const [isWishlistEmpty, setIsWishlistEmpty] = useState(true);
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useFetch(
    `https://daily-goods-4869-default-rtdb.asia-southeast1.firebasedatabase.app/wishlist-${authCtx.id}.json`
  );

  useEffect(() => {
    const wishlisted = [];
    for (const key in data) {
      if (data[key].id !== false) {
        wishlisted.unshift(data[key]);
      }
    }

    if (wishlisted.length !== 0) {
      setIsWishlistEmpty(false);
    } else {
      setIsWishlistEmpty(true);
    }

    setProducts(wishlisted);
  }, [isLoading]);

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <h2 className="page-title">Wishlist</h2>
      {!isWishlistEmpty && <ProductList showProducts={products} />}
      {isWishlistEmpty && <p className="loading">No products.</p>}
    </Fragment>
  );
};

export default Wishlist;
