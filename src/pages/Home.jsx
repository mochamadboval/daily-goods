import { Fragment, useEffect, useState } from "react";

import ProductList from "../components/products/ProductList";
import Pagination from "../components/Pagination";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);

  // console.log(products);

  const { products: showProducts, total } = products;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${skip}`
      );
      const data = await response.json();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [skip]);

  const decreaseSkipHandler = () => {
    setSkip((state) => {
      const count = state - 20;

      if (count > -1) {
        return count;
      }

      return state;
    });
  };

  const increaseSkipHandler = () => {
    setSkip((state) => {
      const count = state + 20;

      if (count < total) {
        return count;
      }

      return state;
    });
  };

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <h2 className="page-title">All Products</h2>
      <ProductList showProducts={showProducts} />
      <Pagination
        onDecrease={decreaseSkipHandler}
        onIncrease={increaseSkipHandler}
      />
    </Fragment>
  );
};

export default Home;
