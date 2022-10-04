import { Fragment, useEffect, useState } from "react";

import useFetch from "../hooks/use-fetch";
import useLimit from "../hooks/use-limit";

import LoadMore from "../components/navigation/LoadMore";
import ProductList from "../components/products/ProductList";

const Home = () => {
  const [initialTotal, setInitialTotal] = useState(0);
  const { isAllLoaded, limit, increaseLimitHandler } = useLimit(initialTotal);
  const { data, isLoading } = useFetch(
    `https://dummyjson.com/products?limit=${limit}`
  );
  const { products: showProducts, total } = data;

  useEffect(() => {
    setInitialTotal(total);
  }, [total]);

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
