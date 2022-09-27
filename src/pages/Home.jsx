import { Fragment, useEffect, useState } from "react";

import ProductList from "../components/products/ProductList";
import LoadMore from "../components/LoadMore";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [limit, setLimit] = useState(20);
  const [products, setProducts] = useState([]);

  const { products: showProducts, total } = products;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}`
      );
      const data = await response.json();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [limit]);

  const increaseLimitHandler = () => {
    setLimit((state) => {
      const count = state + 20;
      console.log(count);
      if (count > total) {
        setIsAllLoaded(true);
        return state;
      }

      return count;
    });
  };

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <h2 className="page-title">All Products</h2>
      <ProductList showProducts={showProducts} />
      {!isAllLoaded && <LoadMore onIncrease={increaseLimitHandler} />}
    </Fragment>
  );
};

export default Home;
