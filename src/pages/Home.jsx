import { Fragment, useEffect, useState } from "react";

import useLimit from "../hooks/use-limit";

import LoadMore from "../components/navigation/LoadMore";
import ProductList from "../components/products/ProductList";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { products: showProducts, total } = products;

  const { isAllLoaded, limit, increaseLimitHandler } = useLimit(total);

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
