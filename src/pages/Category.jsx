import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "../components/products/ProductList";
import LoadMore from "../components/LoadMore";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [limit, setLimit] = useState(20);
  const [products, setProducts] = useState([]);

  const params = useParams();
  const { category } = params;

  const { products: showProducts, total } = products;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}`
      );
      const data = await response.json();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [category, limit]);

  const increaseLimitHandler = () => {
    setLimit((state) => {
      const count = state + 20;
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
      <h2 className="page-title">{category.replace("-", " ")}</h2>
      <ProductList showProducts={showProducts} />
      {!isAllLoaded && <LoadMore onIncrease={increaseLimitHandler} />}
    </Fragment>
  );
};

export default Category;
