import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";

import ProductList from "../components/products/ProductList";

const Wishlist = () => {
  const authCtx = useContext(AuthContext);
  const [isWishlistEmpty, setIsWishlistEmpty] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const wishlisted = JSON.parse(
      localStorage.getItem(`dgWishlist${authCtx.id}`)
    );

    if (wishlisted === null || wishlisted.length === 0) {
      setIsWishlistEmpty(true);
    }

    setProducts(wishlisted);
  }, []);

  return (
    <Fragment>
      <h2 className="page-title">Wishlist</h2>
      {!isWishlistEmpty && <ProductList showProducts={products} />}
      {isWishlistEmpty && <p className="loading">No products.</p>}
    </Fragment>
  );
};

export default Wishlist;
