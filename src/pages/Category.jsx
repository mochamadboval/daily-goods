import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "../components/products/ProductList";
import Pagination from "../components/Pagination";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);

  const params = useParams();
  const { category } = params;

  // console.log(products);

  const { products: showProducts, total } = products;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=20&skip=${skip}`
      );
      const data = await response.json();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [category, skip]);

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
      <h2 className="page-title">{category.replace("-", " ")}</h2>
      <ProductList showProducts={showProducts} />
      <Pagination
        onDecrease={decreaseSkipHandler}
        onIncrease={increaseSkipHandler}
      />
    </Fragment>
  );
};

export default Category;
